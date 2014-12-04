import pymongo
from bson.objectid import ObjectId

from wtforms import form, fields, validators
from flask.ext import admin, login
from flask.ext.admin.form import Select2Widget
from flask.ext.admin.contrib.pymongo import ModelView, filters
from flask.ext.admin.model.fields import InlineFormField, InlineFieldList, FieldList
from werkzeug.security import check_password_hash, generate_password_hash
from .app import app, db


class ModelView(ModelView):

    def is_accessible(self):
        return login.current_user.is_authenticated()


class UserForm(form.Form):
    first_name = fields.TextField('First Name')
    last_name = fields.TextField('Last Name')
    password = fields.PasswordField('Password')
    email = fields.TextField('Email')
    admin = fields.BooleanField('Admin')
    ssn = fields.TextField('SSN')


class UserView(ModelView):
    column_list = ('first_name', 'last_name', 'email', 'ssn')
    column_sortable_list = ('first_name', 'last_name', 'email', 'password')
    form = UserForm

    def on_model_change(self, form, model):
        password = model.get('password')
        model['password'] = generate_password_hash(password)
        return model

# # Tweet view
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
#         users = db.user.find(query, fields=('name',))

#         # Contribute user names to the models
#         users_map = dict((x['_id'], x['name']) for x in users)

#         for item in data:
#             item['user_name'] = users_map.get(item['user_id'])

#         return count, data

#     # Contribute list of user choices to the forms
#     def _feed_user_choices(self, form):
#         users = db.user.find(fields=('name',))
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


class NameForm(form.Form):
    first_name = fields.TextField('First')
    last_name = fields.TextField('Last')


class AddressForm(form.Form):
    address = fields.TextField('Street')
    apt_number = fields.TextField('Apt #')
    zipcode = fields.TextField('Zip code')
    city = fields.TextField('City')


class HouseholdMemberForm(form.Form):
    applying = fields.BooleanField('Applying')
    income = fields.IntegerField('Income')
    relation = fields.TextField('Relationship')
    name = fields.TextField('Name')
    ssn = fields.TextField('SSN')
    state_id = fields.TextField('State ID')
    dob = fields.TextField('Date of Birth')

    is_citizen = fields.BooleanField('Citizen')
    lives_with = fields.BooleanField('Lives with applicant')

    gender = fields.TextField('Gender')
    marital_status = fields.TextField('Marital Status')

    hours_per_week = fields.IntegerField('Hours / week')
    weeks_per_month = fields.IntegerField('Weeks / month')

    pregnant = fields.BooleanField('Pregnant')
    income = fields.IntegerField('Income')


class S3Document(form.Form):
    key = fields.TextField('Key')
    url = fields.TextField('Url')


class SnapPADocuments(form.Form):
    SIG1 = InlineFormField(S3Document)
    SIG2 = InlineFormField(S3Document)


class SnapPAForm(form.Form):
    name = InlineFormField(NameForm)
    address = InlineFormField(AddressForm)
    citizenship = fields.BooleanField('Citizen')
    phone_main = fields.TextField('Phone #')
    ssn = fields.TextField('SSN')
    state_id = fields.TextField('State ID')
    dob = fields.TextField('Date of birth')

    gender = fields.TextField('Gender')
    marital = fields.TextField('Marital Status')
    disabled = fields.BooleanField('Living with disabled')

    self_pregnant = fields.BooleanField('Pregnant')
    pregnant_due_date = fields.TextField('Pregnant due date')
    pregnant_num_babies = fields.IntegerField('Pregnant num babies')

    student = fields.BooleanField('Student')
    student_fulltime = fields.BooleanField('Full Time')
    school_name = fields.TextField('School Name')
    school_grade = fields.TextField('School Grade')

    expenses = fields.IntegerField('Expenses')
    income = fields.IntegerField('Income')
    total_resources = fields.IntegerField('Resources')

    pay_for_heating = fields.BooleanField('Pay for heating')
    pay_for_telephone = fields.BooleanField('Pay for telephone')
    pay_for_other_utilities = fields.BooleanField('Pay for other utilities')
    receiving_snap = fields.BooleanField('Receiving SNAP')
    utilities_paid = FieldList(fields.TextField())

    lived_at_duration = fields.TextField('Lived at duration')
    household = fields.IntegerField('Members in household')
    household_members = InlineFieldList(InlineFormField(HouseholdMemberForm))

    shelter_abused = fields.BooleanField('Abuse shelter')
    migrant_worker = fields.BooleanField('Migrant Worker')

    benefit_amount = fields.IntegerField('Benefit amount')

    documents = InlineFormField(SnapPADocuments)

    app_submitted = fields.BooleanField('Application Submitted')
    doc_submitted = fields.BooleanField('Documents Submitted')


class SnapPAView(ModelView):
    list_template = 'snaplist.html'
    column_list = ('app_submitted', 'doc_submitted', 'name', 'address', 'phone_main', 'household_members')
    column_sortable_list = ('app_submitted', 'doc_submitted', 'name', 'address', 'phone_main')
    form = SnapPAForm


class SnapNYForm(form.Form):
    name = InlineFormField(NameForm)
    address = InlineFormField(AddressForm)
    phone_main = fields.TextField('Phone #')
    ssn = fields.TextField('SSN')
    dob = fields.TextField('Date of birth')
    citizenship = fields.BooleanField('Citizen')
    disabled = fields.BooleanField('Living with Disabled')
    household_members = InlineFieldList(InlineFormField(HouseholdMemberForm))
    app_submitted = fields.BooleanField('Application submitted')
    doc_submitted = fields.BooleanField('Documents submitted')


class SnapNYView(ModelView):
    list_template = 'snaplist.html'
    column_list = ('name', 'address', 'phone_main', 'household_members')
    column_sortable_list = ('name', 'address', 'phone_main')
    form = SnapNYForm


admin = admin.Admin(app, name='Easy Food Stamps')
admin.add_view(UserView(db.users, 'Users'))
admin.add_view(SnapNYView(db.ny_snap, 'NY Snap'))
admin.add_view(SnapPAView(db.pa_snap, 'PA Snap'))
