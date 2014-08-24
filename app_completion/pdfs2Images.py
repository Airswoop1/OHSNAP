__author__ = 'airswoop1'
from wand.image import Image
import os


path = os.getcwd() + '/app_completion/SNAPFORM.pdf'
new_path = os.getcwd() + '/app_completion/test.jpg'

print path

with Image(filename="./app_completion/SNAPFORM.pdf") as i:

    print("width = ", i.width)
    print("height= ", i.height)
    i.save(filename=new_path)

print "Completed!"