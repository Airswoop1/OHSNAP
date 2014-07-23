from pyPdf import PdfFileWriter, PdfFileReader
import csv
from fdfgen import forge_fdf
import os
import sys, getopt

sys.path.insert(0, os.getcwd())
pdf_file = "./app_completion/SNAPFORM.pdf"

output_folder = os.getcwd() + '/output/'


opts, args = getopt.getopt(sys.argv[1:], '', ["Name=", "Address=", "Apt=", "Zip=", "City=" ,"Tel=", "Date=", "ID="])

formatted_data = []
tmp_id = ""

for opt, a in opts:
    if opt=='--Name':
        formatted_data.append(('Name', a))
    elif opt=='--Address':
        formatted_data.append(('Address', a))
    elif opt=='--Apt':
        formatted_data.append(('Apt', a))
    elif opt=='--Zip':
        formatted_data.append(('Zip', a))
    elif opt=='--City':
        formatted_data.append(('City', a))
    elif opt=='--Tel':
        formatted_data.append(('Tel', a))
    elif opt=='--Date':
        formatted_data.append(('sig_date',a))
    elif opt=='--ID':
        tmp_id = a

formatted_data.append(('Applying','X'))

tmp_file = "tmp" + str(tmp_id) + ".fdf"
filename_prefix = "SNAP_Application_" + str(tmp_id)

print formatted_data
#form_fill(formatted_data)

#def form_fill(fields):
fdf = forge_fdf("",formatted_data,[],[],[])
fdf_file = open(tmp_file,"w")
fdf_file.write(fdf)
fdf_file.close()
output_file = '{0}{1}.pdf'.format(output_folder, filename_prefix)
cmd = 'pdftk "{0}" fill_form "{1}" output "{2}" dont_ask'.format(pdf_file, tmp_file, output_file)
os.system(cmd)
os.remove(tmp_file)
#print "Printed data to pdf!"


input = PdfFileReader(file( output_file , "rb"))
watermark = PdfFileReader(file("./app_completion/sig.pdf" , "rb"))
output = PdfFileWriter()

page1 = input.getPage(1)
page1.mergePage(watermark.getPage(0))

output.addPage(input.getPage(1))

outputStream = file(os.getcwd() + "/output/Signed_"+filename_prefix+".pdf" , "wb")
output.write(outputStream)
outputStream.close()
os.remove(output_file)


