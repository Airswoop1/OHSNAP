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
from flask import abort, g, jsonify, render_template
from flask import request, session, url_for, Flask, Response
from flask.ext import babel as _babel
from flask.ext.assets import Bundle, Environment as AssetsEnvironment
from flask.ext.babel import Babel
from jinja2 import Environment, PackageLoader

from . import settings


random.seed(os.urandom(1024))


app = Flask(__name__)
app.config.from_object(settings)
app.jinja_env.autoescape = False

assets = AssetsEnvironment(app)
babel = Babel(app)
conn = pymongo.MongoClient()
db = getattr(conn, 'ohsnap-sandbox')


@babel.localeselector
def get_locale():
    return request.accept_languages.best_match(["en", "es"])


@app.route('/')
def index():
    return render_template("index.html")


@app.route('/templates/<path:partial>')
def partials(partial):
    return render_template(partial)


@app.route("/site-map")
def site_map():
    links = []
    for rule in app.url_map.iter_rules():
        url = rule.rule
        links.append((url, rule.endpoint))
    return "<br/>".join(("%s:%s" % (url, endpoint) for (url, endpoint) in links))

js_deps = Bundle(
    "components/jquery/dist/jquery.min.js",
    "components/jSignature/src/jSignature.js",

    "components/angular/angular.min.js",
    "components/angular-animate/angular-animate.min.js",
    "components/angular-bootstrap/ui-bootstrap.min.js",
    "components/angular-cookies/angular-cookies.min.js",
    "components/angular-touch/angular-touch.min.js",
    "components/angular-ui-router/release/angular-ui-router.min.js",
    "components/ng-file-upload/angular-file-upload.min.js")

js_app = Bundle(
    "js/configurations/*.js",
    "js/filters/*.js",
    "js/factories/*.js",
    "js/services/*.js",
    "js/directives/*.js",
    "js/controllers/*.js",
    "js/app.js")

js_all = Bundle(js_deps, js_app, output="gen/efs-all-bundle.js")

# sass_all = Bundle("css/*.scss", filters="sass", output="gen/efs-sass.css")

css_all = Bundle(
    # sass_all,
    "css/stylesheet.css",
    "css/modal.css",
    output="gen/efs-base.css")


assets.register("js_all", js_all)
assets.register("css_all", css_all)


from . import admin, api
from .snap_ny import *
