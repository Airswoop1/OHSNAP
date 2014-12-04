import collections
import datetime
import os
import cStringIO as StringIO
import sys

from bson.objectid import ObjectId
from fdfgen import forge_fdf
from PIL import Image
from pyPdf import PdfFileWriter, PdfFileReader
from pyzipcode import ZipCodeDatabase
from reportlab.lib.utils import ImageReader
from reportlab.pdfgen import canvas
from subprocess import Popen, PIPE

from .app import app, s3
from .pdfparser import Parser

zcdb = ZipCodeDatabase()



class AttrDict(dict):
    def __init__(self, *args, **kwargs):
        super(AttrDict, self).__init__(*args, **kwargs)
        self.__dict__ = self
        for k, v in self.items():
            if isinstance(v, collections.MutableMapping):
                self[k] = AttrDict(v)


def flatten(d, idx=None):
    items = []
    for k, v in d.items():
        if isinstance(v, list):
            for c, o in enumerate(v):
                items.extend(flatten(o, c + 1).items())
        elif isinstance(v, collections.MutableMapping):
            items.extend(flatten(v).items())
        else:
            items.append((k if idx is None else "%s_%s" % (k, idx), v))
    return dict(items)


def set_radio_fields(obj, fields):
    for f in fields:
        v = obj.pop(f, None)
        if v is not None and (v == True or v == False):
            obj[("%s_yes" if v else "%s_no") % f] = "X"


def generate_doc_pdf(document):
    user = db.users.find_one({"id": user_id})
    user = AttrDict(user)
    if not user:
        abort(400)

    debug_info(user)
    return "WTF"


def get_document_from_s3(key):
    bucketname = app.config.get("S3_DOCUMENTS_BUCKET")
    bucket = s3.create_bucket(bucketname)
    return bucket.get_key(key)


def get_signature_from_s3(key, rect):
    sig = get_document_from_s3(key)
    if not sig:
        raise ValueError('%s not found in S3.' % key)

    sigstr = sig.get_contents_as_string()
    sigimage = Image.open(StringIO.StringIO(sigstr))
    sigimage.load()

    background = Image.new("RGB", sigimage.size, (255, 255, 255))
    background.paste(sigimage, mask=sigimage.split()[3]) # 3 is the alpha channel
    background.save('test_%s' % key)

    sigstream = StringIO.StringIO()
    sigpdf = canvas.Canvas(sigstream)
    w = rect[2] - rect[0]
    h = rect[3] - rect[1]
    sigpdf.drawImage(ImageReader(background), rect[0], rect[1], w, h)
    sigpdf.save()

    sigstream.seek(0)
    return sigstream


def sign_field(page, rect, key):
    sigpdf = get_signature_from_s3(key, rect)
    watermark = PdfFileReader(sigpdf)
    page.mergePage(watermark.getPage(0))


def generate_snap_pa_pdf(pdf_file, user):
    from time import time
    st = time()
    user = AttrDict(user)
    name = " ".join((user.name.first_name, user.name.last_name))
    user["fullname"] = name

    today = datetime.date.today()
    user.sig_date_1 = today.strftime("%m/%d/%Y")
    user.sig_date_2 = today.strftime("%m/%d/%Y")
    user.applying = "X"
    user.applying_snap = True
    set_radio_fields(user, [
        "citizenship",
        "disabled"
        "pay_for_heating",
        "pay_for_telephone",
        "pay_for_other_utilities",
        "receiving_snap"
    ])

    if user.get("utilities_paid", None) and len(user["utilities_paid"]):
        user["utilities_paid"] = ", ".join(user["utilities_paid"])

    for member in user.get("household_members", []):
        set_radio_fields(member, ["applying"])
        hours_per_week =  member.pop("hours_per_week", None)
        weeks_per_month =  member.pop("weeks_per_month", None)
        if hours_per_week and weeks_per_month:
            member.hours_per_month = int(hours_per_week) * int(weeks_per_month)

    address = user.get("address", AttrDict())
    if address and address.address and address.zipcode:
        address.city = zcdb[int(address.zipcode)].city
    else:
        address.address = "N/A"
        address.zipcode = address.city = address.apt_number = " "

    data = flatten(user)
    nt = time(); print "data ready:", nt - st; st = nt

    fdf = forge_fdf("", data.items(), [], [], [])
    nt = time(); print "forged:", nt - st; st = nt
    args = ["pdftk", "%s" % pdf_file, "fill_form", "-", "output", "-", "dont_ask", "flatten"]
    filled_pdf = StringIO.StringIO()
    p = Popen(args, stdin=PIPE, stdout=PIPE, stderr=PIPE)
    stdout, stderr = p.communicate(fdf)
    print stderr
    filled_pdf.write(stdout)
    nt = time(); print "filled:", nt - st; st = nt

    input = PdfFileReader(filled_pdf)

    parser = Parser()
    parser.load(open(pdf_file, "rb"))

    documents = user.pop("documents", {})
    if "SIG1" in documents:
        key = documents["SIG1"]["key"]
        sign_field(input.getPage(4), parser.fields["signature_1"], key)

    if "SIG2" in documents:
        key = documents["SIG2"]["key"]
        sign_field(input.getPage(17), parser.fields["signature_2"], key)

    output = PdfFileWriter()
    for p in [2, 4, 5, 6, 7, 8, 9, 10, 17]:
        output.addPage(input.getPage(p))

    outputStream = StringIO.StringIO()
    output.write(outputStream)
    outputStream.seek(0)
    nt = time(); print "signed:", nt - st; st = nt
    return outputStream.read()
