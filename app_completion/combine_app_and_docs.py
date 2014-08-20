from PIL import Image
from pyPdf import PdfFileWriter, PdfFileReader
import os
import sys, getopt


output_folder = os.getcwd() + '/output/docs'
opts, args = getopt.getopt(sys.argv[1:], '', ["ID="])

user_id = " "

for opt, a in opts:
    if opt=='--ID':
        user_id = a

stripped_user_id = user_id.replace("-", "")
application_file_path = output_folder + "/../Signed_SNAP_Application_" + stripped_user_id + ".pdf"
doc_file_path = output_folder + "/" + user_id + "_DOCS.pdf"
output_file_path = output_folder + "/" + user_id + "_COMPLETE.pdf"

if os.path.isfile(application_file_path) and os.path.isfile(doc_file_path):

        output = PdfFileWriter()
        doc_file = PdfFileReader(file(doc_file_path))
        app_file = PdfFileReader(file(application_file_path))

        for i in xrange(app_file.getNumPages()):
            output.addPage(app_file.getPage(i))

        for j in xrange(doc_file.getNumPages()):
            output.addPage(doc_file.getPage(j))

        outputStream = file(output_file_path, "wb")
        output.write(outputStream)
        outputStream.close()
        os.remove(doc_file_path)
        os.remove(application_file_path)
else:
    raise Exception("Cannot find files to combine!")
