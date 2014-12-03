#!/usr/bin/env python
# -*- coding: utf-8 -*-
import httplib2
import json
import os
import pymongo
import random
import string

from boto.s3.connection import S3Connection
from bson.objectid import ObjectId
from fdfgen import forge_fdf
from flask import abort, flash, g, jsonify, render_template, redirect
from flask import request, session, url_for, Flask, Response
from flask.ext import babel as _babel
from flask.ext.assets import Bundle, Environment
from flask.ext.babel import Babel
from flask.ext.login import LoginManager, UserMixin
from flask.ext.login import login_user, logout_user, login_required
from flask_wtf import Form
from werkzeug.security import check_password_hash
from wtforms import StringField, PasswordField
from wtforms.validators import DataRequired, ValidationError

from . import settings


random.seed(os.urandom(1024))


app = Flask(__name__)
app.config.from_object(settings)
app.jinja_env.autoescape = False


assets = Environment(app)
babel = Babel(app)
conn = pymongo.MongoClient()
db = getattr(conn, 'easyfoodstamps')
login_manager = LoginManager(app)
s3 = S3Connection(
    app.config.get('AWS_ACCESS_KEY_ID'),
    app.config.get('AWS_SECRET_ACCESS_KEY'))


@babel.localeselector
def get_locale():
    return request.accept_languages.best_match(["en", "es"])


class User(UserMixin):
    def __init__(self, dbuser):
        self.dbuser = dbuser
        self.id = str(dbuser["_id"])


@login_manager.user_loader
def load_user(userid):
    data = db.users.find_one(ObjectId(userid))
    return User(data)


class LoginForm(Form):
    email = StringField('Email', [DataRequired()])
    password = PasswordField('Password', [DataRequired()])


@app.route("/login", methods=["GET", "POST"])
def login():
    form = LoginForm()

    if form.validate_on_submit():
        user = db.users.find_one({"email": form.email.data})
        password = form.password.data
        if user and check_password_hash(user["password"], password):
            login_user(User(user))
            return redirect(request.args.get("next") or url_for("index"))
        else:
            flash("Invalid email or password")

    return render_template("login.html", form=form)


@app.route("/logout")
@login_required
def logout():
    logout_user()
    return redirect(url_for("index"))


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
