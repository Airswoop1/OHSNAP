from PIL import Image
from pyPdf import PdfFileWriter, PdfFileReader
import os
import sys, getopt


output_folder = os.getcwd() + '/output/docs'
opts, args = getopt.getopt(sys.argv[1:], '', ["ID=", "Doc1=", "Doc2=", "Doc3=", "Doc4=",
                                              "Doc5=", "Doc6=", "Doc7=", "Doc8=", "SignedFileName="])

signedFile = ""
user_id = ""
docs = []

for opt, a in opts:
    if opt=='--SignedFileName':
        signedFile = a
    elif opt=='--ID':
        user_id = a
    elif opt=='--Doc1':
        docs.append(a)
    elif opt=='--Doc2':
        docs.append(a)
    elif opt=='--Doc3':
        docs.append(a)
    elif opt=='--Doc4':
        docs.append(a)
    elif opt=='--Doc5':
        docs.append(a)
    elif opt=='--Doc6':
        docs.append(a)
    elif opt=='--Doc7':
        docs.append(a)
    elif opt=='--Doc8':
        docs.append(a)

output = PdfFileWriter()

def addImagetoPDFOutput(doc):
    input_image_file = doc
    input_pdf_file = doc.split('.')[0] + ".pdf"

    im = Image.open(output_folder + "/" + input_image_file)
    if input_image_file.split('.')[-1] == 'png':
        im = im.convert('RGB')
    im.save(output_folder + "/" + input_pdf_file, "PDF")

    input = PdfFileReader(file(output_folder + "/" + input_pdf_file, "rb"))
    output.addPage(input.getPage(0))
    os.remove(output_folder + "/" + input_pdf_file)
    os.remove(output_folder + "/" + input_image_file)


for d in docs:
    addImagetoPDFOutput(d)


output_file = user_id + "_DOCS.pdf"
outputStream = file(output_folder + "/" + output_file, "wb")
output.write(outputStream)
outputStream.close()
