import collections
import datetime
import os
import cStringIO as StringIO
import sys

from bson.objectid import ObjectId
from fdfgen import forge_fdf
from pyPdf import PdfFileWriter, PdfFileReader
from pyzipcode import ZipCodeDatabase
from subprocess import Popen, PIPE

from flask import abort, Response, request

from .app import app, db


zcdb = ZipCodeDatabase()


class AttrDict(dict):
    def __init__(self, *args, **kwargs):
        super(AttrDict, self).__init__(*args, **kwargs)
        self.__dict__ = self
        for k, v in self.items():
            if isinstance(v, collections.MutableMapping):
                self[k] = AttrDict(v)


def debug_info(name, user):
    percent_completed = len(user.keys())
    print user["_id"], name, user["phone_main"], user["ssn"], percent_completed


def get_signature_watermarks(user):
    im1 = Image.open(sig1_path)
    im2 = Image.open(sig2_path)

    im1 = im1.convert("RGB")
    im2 = im2.convert("RGB")

    im1.save("", "PDF")
    im2.save("", "PDF")


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
        v = obj.pop(f)
        obj[("%s_yes" if v else "%s_no") % f] = "X"


@app.route("/ny/snap/doc/<user_id>/")
def generate_snap_doc_pdf(user_id):
    user = db.users.find_one({"id": user_id})
    user = AttrDict(user)
    if not user:
        abort(400)

    debug_info(user)
    return "WTF"


@app.route("/ny/snap/app/<user_id>", methods=["GET"])
def generate_snap_app_pdf(user_id):
    user = db.users.find_one({"_id": ObjectId(user_id)})
    if not user:
        abort(400)

    user = AttrDict(user)
    name = " ".join((user.name.first_name, user.name.last_name))
    debug_info(name, user)

    today = datetime.date.today()
    user.sig_date_1 = today.strftime("%m/%d/%Y")
    user.sig_date_2 = today.strftime("%m/%d/%Y")
    user.applying = "X"
    set_radio_fields(user, ["citizen", "household_disabled"])

    for member in user.household_members:
        set_radio_fields(member, ["applying"])
        name =  member.pop("name")
        member["first_name"], member["last_name"] = name.split(" ")

        hours_per_week =  member.pop("hours_per_week")
        weeks_per_month =  member.pop("weeks_per_month")
        if hours_per_week and weeks_per_month:
            user.hours_per_month = int(hours_per_week) * int(weeks_per_month)

    address = user.address
    if address.address and address.zipcode:
        address.city = zcdb[int(address.zipcode)].city
    else:
        address.address = "N/A"
        address.zipcode = address.city = address.apt = " "

    data = flatten(user)
    data["name"] = name
    print data

    fdf = forge_fdf("", data.items(), [], [], [])
    pdf_file = "./app_completion/SNAPFORM.pdf"
    args = ["pdftk", "%s" % pdf_file, "fill_form", "-", "output", "-", "dont_ask", "flatten"]
    filled_pdf = StringIO.StringIO()
    p = Popen(args, stdin=PIPE, stdout=PIPE, stderr=PIPE)
    stdout, stderr = p.communicate(fdf)
    print stderr
    filled_pdf.write(stdout)

    input = PdfFileReader(filled_pdf)
    watermark = PdfFileReader(file("./app_completion/sig.pdf" , "rb"))
    watermark2 = PdfFileReader(file("./app_completion/sig2.pdf" , "rb"))

    output = PdfFileWriter()
    page1 = input.getPage(1)
    page1.mergePage(watermark.getPage(0))
    page2 = input.getPage(5)
    page2.mergePage(watermark2.getPage(0))

    output.addPage(input.getPage(1))
    output.addPage(input.getPage(2))
    output.addPage(input.getPage(3))
    output.addPage(input.getPage(5))

    outputStream = StringIO.StringIO()
    output.write(outputStream)
    outputStream.seek(0)
    return Response(outputStream.read(), mimetype="application/pdf")
