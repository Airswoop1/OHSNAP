/**
 * Created by airswoop1 on 6/17/14.
 */
var Index = require('./Index.js');
var UploadUserInfo = require('./UploadUserInfo.js');
var DocumentationUpload = require('./DocumentationUpload.js');

var api = (function(){

    function set_routes(app){
        app.get('/', Index.execute);
        app.post('/upload_user_info', UploadUserInfo.execute);
        app.get('/upload_user_info', UploadUserInfo.execute);
        app.post('/upload_docs', DocumentationUpload.execute);
    }

    return {
        "set_routes":set_routes
    }

}())

module.exports = api