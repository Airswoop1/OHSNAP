#! /usr/bin/env python
from setuptools import setup


setup(
    name="easyfoodstamps",
    version="0.0.1",
    author="Ram Mehta",
    description="Easy food stamps server & api.",
    zip_safe=False,
    install_requires=[
        "Flask>=0.10.1",
        "Flask-Admin>=1.0.8",
        "Flask-Babel",
        "Wtforms==1.0.5",
        "Flask-Script>=2.0.5",
        "PyMongo>=2.6.1",
        "fdfgen==0.11.0",
        "pillow==2.6.1",
        "pypdf==1.13", # Why not PyPdf2?
        "pyzipcode>=0.4",
        "wand==0.3.8"  # Is this needed?
    ])
