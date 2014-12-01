from .app import app


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
