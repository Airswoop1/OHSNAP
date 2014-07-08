/**
 * Created by airswoop1 on 7/7/14.
 */

var MongoClient = require('../database.js');

var SubmitFeedback = (function(){


    var Request = function(){
        this.status = undefined;
    };

    var Response = function(){
        this.status = undefined;
        this.message = undefined;
    };

    var execute = function(req,res){
        console.log(req.body);
        if(req.body.user_id && req.body.rating && req.body.feedback_message){
            var user_id = req.body.user_id;
            var rating = req.body.rating;
            var feedback_message = req.body.feedback_message;
        }
        else{
            var response = new Response();
            response.status = 400;
            response.message = 'incorrect parameters';
            res.send(400, response);
            return;
        }


        MongoClient.getConnection(function(db_err, db) {
            if(db_err) {
                console.log(db_err);
                var response = new Response();
                response.status = 500;
                response.message = 'error connecting to db';
                res.send(500, response);
            }
            else {
                var collection = db.collection('feedback');

                var query = {}
                query['user_id'] = user_id;

                var update = {};
                update['user_id'] = user_id;
                update['rating'] = rating;
                update['feedback_message'] = feedback_message;

                collection.update(
                    query,
                    update,
                    {"upsert":true, "multi": false},
                    function(err, updated) {
                        if(err){
                            console.log(err);
                            var response = new Response();
                            response.status = 500;
                            response.message = 'error inserting feedback into db';
                            res.send(500, response);
                        }
                        else{
                            var response = new Response();
                            response.status = 201;
                            response.message = "successfully uploaded user feedback";
                            res.send(201, response);
                        }
                    })

            }
        })

    }


    return {
        "execute":execute
    }

}())


module.exports = SubmitFeedback;