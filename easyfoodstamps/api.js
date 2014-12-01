/**
 * Created by airswoop1 on 6/17/14.
 */
exports = module.exports = function(app) {
  app.post('/upload_user_info', require('./UploadUserInfo'));
  app.post('/update_user_info', require('./UpdateUserInfo'));
  app.post('/upload_docs', require('./DocumentationUpload').execute);
  app.post('/submit_feedback', require('./SubmitFeedback'));
  app.post('/send_sig_data', require('./SignatureData').execute);
};
