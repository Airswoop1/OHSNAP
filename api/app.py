#!/usr/bin/env python
# -*- coding: utf-8 -*-
import httplib2
import json
import os
import pymongo
import random
import string

from bson.objectid import ObjectId
from fdfgen import forge_fdf
from flask import abort, g, jsonify, request, session, url_for
from flask import Flask, Response
from pyPdf import PdfFileReader, PdfFileWriter


app = Flask(__name__)
app.debug = True
app.secret_key = "UNIQUE KEY!"

conn = pymongo.MongoClient()
db = getattr(conn, 'ohsnap-sandbox')


from . import admin
from .snap_ny import *


@app.route('/upload_user_info', methods=["POST"])
def UploadUserInfo():
    pass


@app.route("/update_user_info", methods=["POST"])
def UpdateUserInfo():
    pass


@app.route("/upload_docs", methods=["POST"])
def DocumentationUpload():
    pass


@app.route("/submit_feedback", methods=["POST"])
def SubmitFeedback():
    pass


@app.route("/get_doc_status", methods=["POST"])
def DocumentStatus():
    pass


@app.route("/send_sig_data", methods=["POST"])
def SignatureData():
    pass


app.route("/report_error_loading_images", methods=["POST"])
def ErrorLoadingImages():
    pass


@app.route("/site-map")
def site_map():
    links = []
    for rule in app.url_map.iter_rules():
        url = rule.rule
        links.append((url, rule.endpoint))
    return "<br/>".join(("%s:%s" % (url, endpoint) for (url, endpoint) in links))