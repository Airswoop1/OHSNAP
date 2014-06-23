/**
 * Created by airswoop1 on 6/17/14.
 */
var Index = require('./Index.js');
var PopulateApplication = require('./PopulateApplication.js');

var api = (function(){

    function set_routes(app){
        app.get('/', Index.execute);
        app.post('/create_base_pdf',PopulateApplication.execute);
        app.get('/create_base_pdf',PopulateApplication.execute);
    }

    return {
        "set_routes":set_routes
    }

}())

module.exports = api