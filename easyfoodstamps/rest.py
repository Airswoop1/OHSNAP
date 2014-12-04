import os
import base64
import bson
import functools
import operator

from boto.s3.key import Key
from bson import ObjectId, json_util as json
from flask import Blueprint, Response, abort, g
from flask import redirect, request, session, url_for
from werkzeug import secure_filename

from .app import app, db, s3
from .pdffiller import generate_snap_pa_pdf


class BadRequestException(Exception):
    pass


class Authentication(object):
    def __init__(self, protected_methods=None):
        if protected_methods is None:
            protected_methods = ['DELETE']

        self.protected_methods = protected_methods

    def authorize(self):
        if request.method in self.protected_methods:
            return False

        return True


class RestResource(object):

    paginate_by = 20

    required_fields = []

    immutable_fields = []

    exclude_fields = []

    allow_attachments = False

    def __init__(self, rest_api, collection, authentication, allowed_methods=None):
        self.api = rest_api
        self.collection = getattr(db, collection)

        self.authentication = authentication
        self.allowed_methods = allowed_methods or ['GET', 'POST', 'PUT', 'DELETE']

    def authorize(self):
        return self.authentication.authorize()

    def get_api_name(self):
        return self.collection.name

    def get_url_name(self, name):
        return '%s.%s_%s' % (
            self.api.blueprint.name,
            self.get_api_name(),
            name,
        )

    def get_value(self, field, data):
        parts = field.split(".")
        for p in parts:
            data = data.get(p, None)
            if data is None:
                break
        return data

    def get_query(self):
        return {}

    def process_query(self, query):
        return self.collection.find(query)

    def prepare_data(self, obj, data):
        """
        Hook for modifying outgoing data
        """
        return data

    def response_forbidden(self):
        return Response('Forbidden', 403)

    def response_bad_method(self):
        return Response('Unsupported method "%s"' % (request.method), 405)

    def response_bad_request(self, msg=''):
        return Response('Bad request: %s' % msg, 400)

    def response(self, data):
        self.sanitize_response(data)
        kwargs = {} if request.is_xhr else {'indent': 2}
        return Response(json.dumps(data, **kwargs), mimetype='application/json')

    def require_method(self, func, methods):
        @functools.wraps(func)
        def inner(*args, **kwargs):
            if request.method not in methods:
                return self.response_bad_method()

            try:
                return func(*args, **kwargs)
            except bson.errors.InvalidId, err:
                return self.response_bad_request(str(err))
            except BadRequestException, err:
                return self.response_bad_request(str(err))

        return inner

    def get_urls(self):
        return (
            ('/', self.require_method(self.api_list, ['GET', 'POST'])),
            ('/<pk>/', self.require_method(self.api_detail, ['GET', 'POST', 'PUT', 'DELETE'])),
            ('/<pk>/delete/', self.require_method(self.post_delete, ['POST', 'DELETE'])),
        )

    def check_get(self, obj=None):
        return True

    def check_post(self, obj=None):
        return True

    def check_put(self, obj):
        return True

    def check_delete(self, obj):
        return True

    def api_list(self):
        if not getattr(self, 'check_%s' % request.method.lower())():
            return self.response_forbidden()

        if request.method == 'GET':
            return self.object_list()
        elif request.method == 'POST':
            return self.create()

    def api_detail(self, pk, method=None):
        obj = self.collection.find_one(ObjectId(pk))
        if not obj:
            raise BadRequestException("No document with ID:" % pk)

        method = method or request.method
        if not getattr(self, 'check_%s' % method.lower())(obj):
            return self.response_forbidden()

        if method == 'GET':
            return self.object_detail(obj)
        elif method in ('PUT', 'POST'):
            return self.edit(obj)
        elif method == 'DELETE':
            return self.delete(obj)

    def post_delete(self, pk):
        return self.api_detail(pk, 'DELETE')

    def apply_ordering(self, query):
        return query

    def object_list(self):
        query = self.get_query()
        query = self.apply_ordering(query)

        # process any filters
        res = self.process_query(query)
        return self.response(dict(objects=[r for r in res]))

    def object_detail(self, obj):
        return self.response(obj)

    def read_request_data(self):
        try:
            data = request.data or request.form.get('data') or ''
            json_data = json.loads(data.decode('utf8'))
            return self.sanitize_request(json_data)
        except ValueError:
            raise BadRequestException('Malformed JSON')

    def sanitize_request(self, data):
        if isinstance(data, dict):
            return {k: self.sanitize_request(v) for k, v in data.iteritems()}
        elif isinstance(data, list):
            return [self.sanitize_request(v) for v in data]
        elif data == "yes":
            return True
        elif data == "no":
            return False
        return data

    def sanitize_response(self, data):
        for f in self.exclude_fields:
            if f in data:
                del data[f]
        return data

    def create(self):
        data = self.read_request_data()

        for f in self.required_fields:
            if self.get_value(f, data) is None:
                raise BadRequestException('%s is required' % f)

        obj_id = self.collection.insert(data)
        data["_id"] = obj_id
        return self.response(data)

    def edit(self, obj):
        data = self.read_request_data()

        for f in self.immutable_fields:
            v = self.get_value(f, data)
            if v is not None and v != self.get_value(f, obj):
                raise BadRequestException('%s is immutable' % f)

        attachments = data.pop("attachments", None)
        documents = obj.setdefault("documents", {})
        if self.allow_attachments and attachments:
            bucketname = app.config.get("S3_DOCUMENTS_BUCKET")
            for attachment in attachments:
                doctype = attachment["doctype"]
                key = self.upload_attachment(obj, attachment, bucketname)
                url = "http://%s.s3.amazonaws.com/%s"  % (bucketname, key)
                documents[doctype] = dict(url=url, key=key)

        obj.update(data)
        self.collection.save(obj)
        return self.response(obj)

    def delete(self, obj):
        return self.response({'deleted': False})

    def resize_attachment(self, contents, content_type):
      #     tempImg.onload = function () {
      #       var MAX_WIDTH = 800,
      #         MAX_HEIGHT = 600,
      #         tempW = tempImg.width,
      #         tempH = tempImg.height;

      #       //  is it landscape? if so...
      #       if (tempW > tempH) {
      #         if (tempW > MAX_WIDTH) {
      #           tempH *= MAX_WIDTH / tempW;
      #           tempW = MAX_WIDTH;
      #         }
      #       } else {
      #         if (tempH > MAX_HEIGHT) {
      #           tempW *= MAX_HEIGHT / tempH;
      #           tempH = MAX_HEIGHT;
      #         }
      #       }

      #       var canvas = document.createElement('canvas');
      #       canvas.width = tempW;
      #       canvas.height = tempH;

      #       var ctx = canvas.getContext('2d');
      #       ctx.drawImage(this, 0, 0, tempW, tempH);
      #       callback(canvas.toDataURL(file.type));
      #     }
      pass

    def upload_attachment(self, obj, attachment, bucketname):
        doctype = attachment["doctype"]
        content_type = attachment["filetype"]
        filetype, ext = content_type.split("/")

        if filetype != "image":
            raise BadRequestException("Unsupported type %s" % content_type)

        if "data" in attachment:
            content = base64.b64decode(attachment["data"])
        else:
            fd = request.files["file"]
            content = fd.stream.read()

        randomhash = os.urandom(16).encode('hex')
        filename = "%s-%s-%s.%s" % (obj["ssn"], doctype, randomhash, ext)
        filename = secure_filename(filename)

        
        bucket = s3.create_bucket(bucketname)
        key = Key(bucket)
        key.key = filename
        key.set_contents_from_string(content, {"Content-Type": content_type}, True)
        key.set_acl('public-read')
        return key.key


class FormResource(RestResource):

    pdf_template = None

    def get_urls(self):
        return super(FormResource, self).get_urls() + (
            ('/<pk>/sign/', self.require_method(self.sign, ['GET'])),
        )

    def sign(self, pk):
        obj = self.collection.find_one(ObjectId(pk))
        page = request.args.get("page", None)
        if not obj:
            raise BadRequestException("No document with ID:" % pk)

        pdf = generate_snap_pa_pdf(self.pdf_template, obj)
        return Response(pdf, mimetype="application/pdf")


class RestAPI(object):

    def __init__(self, app, prefix='/api', default_auth=None, name='api'):
        self.app = app

        self._registry = {}

        self.url_prefix = prefix
        self.blueprint = self.get_blueprint(name)

        self.default_auth = default_auth or Authentication()

    def register(self, collection, provider=RestResource, auth=None, allowed_methods=None):
        self._registry[collection] = provider(
            self, collection, auth or self.default_auth, allowed_methods)

    def unregister(self, collection):
        del(self._registry[collection])

    def is_registered(self, collection):
        return self._registry.get(collection)

    def response_auth_failed(self):
        return Response('Authentication failed', 401, {
            'WWW-Authenticate': 'Basic realm="Login Required"'
        })

    def auth_wrapper(self, func, provider):
        @functools.wraps(func)
        def inner(*args, **kwargs):
            if not provider.authorize():
                return self.response_auth_failed()
            return func(*args, **kwargs)
        return inner

    def get_blueprint(self, blueprint_name):
        return Blueprint(blueprint_name, __name__)

    def get_urls(self):
        return ()

    def configure_routes(self):
        for url, callback in self.get_urls():
            self.blueprint.route(url)(callback)

        for provider in self._registry.values():
            api_name = provider.get_api_name()
            for url, callback in provider.get_urls():
                full_url = '/%s%s' % (api_name, url)
                self.blueprint.add_url_rule(
                    full_url,
                    '%s_%s' % (api_name, callback.__name__),
                    self.auth_wrapper(callback, provider),
                    methods=provider.allowed_methods,
                )

    def register_blueprint(self, **kwargs):
        self.app.register_blueprint(self.blueprint, url_prefix=self.url_prefix, **kwargs)

    def setup(self):
        self.configure_routes()
        self.register_blueprint()
