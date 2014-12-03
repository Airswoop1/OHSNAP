#! /usr/bin/env python
from setuptools import setup


setup(
    name="easyfoodstamps",
    version="0.0.1",
    author="Ram Mehta",
    description="Easy food stamps server & api.",
    zip_safe=False,
    install_requires=[
        "boto",
        "Flask>=0.10.1",
        "Flask-Admin>=1.0.8",
        "Flask-Assets>=0.10",
        "Flask-Babel>=0.9",
        "Flask-Login>=0.2.11",
        "Flask-Script>=2.0.5",
        "Flask-Triangle>=0.5.4",
        "Flask-Wtf",
        "PyMongo>=2.6.1",
        "fdfgen==0.11.0",
        "httplib",
        "pdfminer",
        "pillow==2.6.1",
        "pypdf==1.13", # Why not PyPdf2?
        "pyphaxio",
        "pyzipcode>=0.4",
        "reportlab",
        "wand==0.3.8",  # Is this needed?
        "Wtforms==1.0.5",
    ])
