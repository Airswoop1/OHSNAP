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


class SnapNYView(ModelView):
    list_template = 'snaplist.html'
    column_list = ('name', 'address', 'phone_main', 'household_members')
    column_sortable_list = ('name', 'address', 'phone_main')
    form = SnapNYForm


# Tweet view
# class TweetForm(form.Form):
#     name = fields.TextField('Name')
#     user_id = fields.SelectField('User', widget=Select2Widget())
#     text = fields.TextField('Text')

#     testie = fields.BooleanField('Test')


# class TweetView(ModelView):
#     column_list = ('name', 'user_name', 'text')
#     column_sortable_list = ('name', 'text')

#     column_filters = (filters.FilterEqual('name', 'Name'),
#                       filters.FilterNotEqual('name', 'Name'),
#                       filters.FilterLike('name', 'Name'),
#                       filters.FilterNotLike('name', 'Name'),
#                       filters.BooleanEqualFilter('testie', 'Testie'))

#     column_searchable_list = ('name', 'text')

#     form = TweetForm

#     def get_list(self, *args, **kwargs):
#         count, data = super(TweetView, self).get_list(*args, **kwargs)

#         # Grab user names
#         query = {'_id': {'$in': [x['user_id'] for x in data]}}
#         users = db.users.find(query, fields=('name',))

#         # Contribute user names to the models
#         users_map = dict((x['_id'], x['name']) for x in users)

#         for item in data:
#             item['user_name'] = users_map.get(item['user_id'])

#         return count, data

#     # Contribute list of user choices to the forms
#     def _feed_user_choices(self, form):
#         users = db.users.find(fields=('name',))
#         form.user_id.choices = [(str(x['_id']), x['name']) for x in users]
#         return form

#     def create_form(self):
#         form = super(TweetView, self).create_form()
#         return self._feed_user_choices(form)

#     def edit_form(self, obj):
#         form = super(TweetView, self).edit_form(obj)
#         return self._feed_user_choices(form)

#     # Correct user_id reference before saving
#     def on_model_change(self, form, model):
#         user_id = model.get('user_id')
#         model['user_id'] = ObjectId(user_id)

#         return model


admin = admin.Admin(app, name='Easy Food Stamps')
admin.add_view(SnapNYView(db.users, 'NY Snap'))
