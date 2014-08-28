__author__ = 'airswoop1'
import os
from pyPdf import PdfFileWriter, PdfFileReader
from PIL import Image
from PIL import ImageChops

def convertToPDF(user_id):

    sig1_path = ""
    sig2_path = ""

    if os.path.isfile(sig1_path) and os.path.isfile(sig2_path):

        im1 = Image.open(sig1_path)
        im2 = Image.open(sig2_path)

        im1 = im1.convert('RGB')
        im2 = im2.convert('RGB')

        #offset images in open image files before saving to PDF

        im1.save("", "PDF")
        im2.save("", "PDF")
