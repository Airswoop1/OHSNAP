from .app import app

from .rest import RestAPI, FormResource, BadRequestException


class PASnapResource(FormResource):

    allow_attachments = True

    pdf_template = "./forms/pa_snap.pdf"

    exclude_fields = [
        "password"
    ]

    required_fields = [
        "name.first_name",
        "name.last_name",
        "phone_main",
        "ssn"
    ]

    immutable_fields = [
        "ssn"
    ]

    def check_get(self):
        return False


api = RestAPI(app)
api.register("pa_snap", PASnapResource)
api.setup()

# @app.route('/upload_user_info', methods=["POST"])
# def UploadUserInfo():
#     pass


# @app.route("/update_user_info", methods=["POST"])
# def UpdateUserInfo():
#     pass


# @app.route("/upload_docs", methods=["POST"])
# def DocumentationUpload():
#     pass


# @app.route("/submit_feedback", methods=["POST"])
# def SubmitFeedback():
#     pass


# @app.route("/get_doc_status", methods=["POST"])
# def DocumentStatus():
#     pass


# @app.route("/send_sig_data", methods=["POST"])
# def SignatureData():
#     pass


# app.route("/report_error_loading_images", methods=["POST"])
# def ErrorLoadingImages():
#     pass
