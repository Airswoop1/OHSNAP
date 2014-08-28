/**
 * Created by airswoop1 on 6/17/14.
 */
var MongoClient = require('../database.js'),
	uuid = require('node-uuid'),
	sanitizer = require('sanitizer'),
	util = require('util');



var UploadUserInfo = (function(){


    var Request = function(){
        this.status = undefined;
    };

    var Response = function(){
        this.status = undefined;
        this.message = undefined;
        this.user_id = undefined;
    };

    var execute = function(req, res){
		console.log(req.body);
        if(req.method == 'GET'){
            res.send("Oops, this isn't what you're looking for!");
        }
        else if(req.method == 'POST') {
            validate_data(req.body, function(validated){

                if(validated){

                    MongoClient.getConnection(function(db_err, db){
                        if(db_err) {
                            console.error(db_err);
                            var response = new Response();
                            response.status = 404;
                            response.message = 'error connecting to db';
                            res.send(response);
                        }
                        else {
                            var collection = db.collection('users');

                            var query = {};
                            var user_id = uuid.v4();

                            query['user_id'] = user_id;
                            req.body['user_id'] = user_id;
                            req.body['created_on'] = new Date().getTime();

                            collection.update(
                                query,
                                req.body,
                                {"upsert":true, "multi": false},
                                function (err, updated) {
                                    if(err){
                                        console.error("error writing to the db for user: " + user_id);
                                        console.error(err);
                                        var response = new Response();
                                        response.status = 500;
                                        response.message = "error writing to db";

                                        res.send(500, response);
                                    }
                                    else {

                                        var response = new Response();
                                        response.status = 201;
                                        response.message = "successfully uploaded user data";
                                        response.user_id = user_id;
                                        res.send(201, response);
                                    }
                                })

                        }

                    })
                }
                else {
                    console.error("Request body not valid user data");
	                var response = new Response();
                    response.status = 400;
                    response.message = 'input data incorrect';
                    res.send(400,response);
                }
            })
        }

    }


    function validate_data(data, callback) {


	    /**
	     * Should really do recursive sanitization here for each sub-object in data
	     */
	    for(var value in data) {

		    if(data.hasOwnProperty(value)){

			    if(typeof data[value] === 'object'){
				    for(var sub in data[value]){
					    if(data[value].hasOwnProperty(sub)){
						   data[value][sub] = sanitizer.escape(data[value][sub]);
					    }
				    }
			    }
			    else {
				    data[value] = sanitizer.escape(data[value]);
			    }

		    }

	    }

	    if(!(data.name.first_name && data.name.last_name && ( data.phone_main || data.address.street_address))) {
            callback(null);
        }
        else {
            callback(true);
        }
    }

    return {
        "execute":execute
    }

}());

module.exports = UploadUserInfo;