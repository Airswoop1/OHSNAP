import pymongo
from bson.objectid import ObjectId

from wtforms import form, fields, validators
from flask.ext import admin
from flask.ext.admin.form import Select2Widget
from flask.ext.admin.contrib.pymongo import ModelView, filters
from flask.ext.admin.model.fields import InlineFormField, InlineFieldList
from .app import app, db


class NameForm(form.Form):
    first_name = fields.TextField('First Name')
    last_name = fields.TextField('Last Name')


class AddressForm(form.Form):
    address = fields.TextField('Street Address')
    apt = fields.TextField('Apt #')
    zipcode = fields.TextField('Zip Code')
    city = fields.TextField('City')


class HouseholdMemberForm(form.Form):
    applying = fields.BooleanField('Applying')
    income = fields.IntegerField('Income')
    relationship = fields.TextField('Relationship')
    name = fields.TextField('Name')
    ssn = fields.TextField('SSN')
    dob = fields.TextField('Date of Birth')
    hours_per_week = fields.IntegerField('Hours per Week')
    weeks_per_month = fields.IntegerField('Weeks per Month')


class SnapNYForm(form.Form):
    name = InlineFormField(NameForm)
    address = InlineFormField(AddressForm)
    phone_main = fields.TextField('Phone #')
    ssn = fields.TextField('SSN')
    dob = fields.TextField('Date of Birth')
    citizen = fields.BooleanField('Citizen')
    household_disabled = fields.BooleanField('Living with Disabled')
    household_members = InlineFieldList(InlineFormField(HouseholdMemberForm))


class SnapPAForm(form.Form):
    name = InlineFormField(NameForm)
    address = InlineFormField(AddressForm)
    phone_main = fields.TextField('Phone #')
    ssn = fields.TextField('SSN')
    dob = fields.TextField('Date of Birth')
    citizen = fields.BooleanField('Citizen')
    household_disabled = fields.BooleanField('Living with Disabled')
    household_members = InlineFieldList(InlineFormField(HouseholdMemberForm))


class SnapNYView(ModelView):
    list_template = 'snaplist.html'
    column_list = ('name', 'address', 'phone_main', 'household_members')
    column_sortable_list = ('name', 'address', 'phone_main')
    form = SnapNYForm


class SnapPAView(ModelView):
    list_template = 'snaplist.html'
    column_list = ('name', 'address', 'phone_main', 'household_members')
    column_sortable_list = ('name', 'address', 'phone_main')
    form = SnapNYForm


admin = admin.Admin(app, name='Easy Food Stamps')
admin.add_view(SnapNYView(db.nysnap, 'NY Snap'))
admin.add_view(SnapPAView(db.pasnap, 'PA Snap'))
