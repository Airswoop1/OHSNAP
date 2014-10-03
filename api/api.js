/**
 * Created by airswoop1 on 6/17/14.
 */
var Index = require('./Index.js'),
    UploadUserInfo = require('./UploadUserInfo.js'),
	UpdateUserInfo = require('./UpdateUserInfo.js'),
    DocumentationUpload = require('./DocumentationUpload.js'),
    SubmitFeedback = require('./SubmitFeedback.js'),
    DocumentStatus = require('./DocumentStatus.js'),
	SignatureData = require('./SignatureData.js'),
	ErrorLoadingImages = require('./ErrorLoadingImages.js'),
	ReceiveSMSResponse = require('./Twilio/ReceiveSMSResponse.js'),
	ReceiveTwilioResponse = require('./Twilio/ReceiveTwilioResponse.js');


var api = (function(){

    function set_routes(app){
        app.get('/', Index.execute);
        app.post('/upload_user_info', UploadUserInfo.execute);
        app.get('/upload_user_info', UploadUserInfo.execute);
	    app.post('/update_user_info', UpdateUserInfo.execute);
        app.post('/upload_docs', DocumentationUpload.execute);
        app.post('/submit_feedback', SubmitFeedback.execute);
        app.post('/get_doc_status', DocumentStatus.execute);
	    app.post('/send_sig_data', SignatureData.execute);
	    app.post('/report_error_loading_images', ErrorLoadingImages.execute);


	    app.post('/receive_sms_response', ReceiveSMSResponse.execute);
	    app.post('/receive_twilio_response', ReceiveTwilioResponse.execute);
    }

    return {
        "set_routes":set_routes
    }

}());

module.exports = api;