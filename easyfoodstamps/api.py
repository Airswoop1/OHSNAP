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

# @app.route("/submit_feedback", methods=["POST"])
# def SubmitFeedback():
# {user_id: user_id},
# {
# user_id: user_id,
# rating: rating.value,
# feedback_message: req.body.feedback_message || '',
# rec_sms: req.body.sms_agree || false,
# created_on: (new Date()).getTime()
# },
# {upsert:true, multi: false},
