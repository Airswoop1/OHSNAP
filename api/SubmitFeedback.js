/**
 * Created by airswoop1 on 7/7/14.
 */

var MongoClient = require('../database.js');

var SubmitFeedback = (function(){


    var execute = function(req,res){

        MongoClient.getConnection(function(db_err, db) {
            if(db_err) {
                console.log(db_err);
                var response = new Response();
                response.status = 404;
                response.message = 'error connecting to db';
                res.send(response);
            }
            else {
                var collection = db.collection('users');
                res.send(404);
            }
        })

    }


    return {
        "execute":execute
    }

}())


module.exports = SubmitFeedback;