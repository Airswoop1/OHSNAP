/**
 * Created by airswoop1 on 6/17/14.
 */
var cities = require('cities');
var MongoClient = require('../database.js');

var PopulateApplication = (function(){


    var Request = (function(){
        this.status = undefined;
    }());

    var Response = (function(){
        this.status = undefined;
        this.message = undefined;
    }());

    var execute = function(req, res){
        console.log("Getting to execute of PopulateApplication!");
        if(req.method == 'GET'){
            res.send("hello get populate application")
        }
        else if(req.method == 'POST') {
            //var pdf_data = format_request_for_pdf(req.body);
            //var mongo_data = format_request_for_db(req.body);

            MongoClient.getConnection(function(db_err, db){
                if(db_err) {
                    console.log(db_err);
                    var response = new Response();
                    response.status = 404;
                    response.message = 'error connecting to db';
                    res.send(response);
                }
                else {
                    var collection = db.collection('users');

                    var query = {};
                    query['phone_main'] = req.body.phone_main;

                    collection.update(
                        query,
                        req.body,
                        {"upsert":true, "multi": false},
                        function (err, updated) {
                            if(err){
                                console.log(err);
                                res.send(200);
                            }
                            else {
                                console.log("successfully updated db!")
                                console.log(updated);
                                res.send(200);
                            }
                        })

                }

            })


            /*populate_pdf(formatted_data,function(err, result){
                if(err){
                    res.send(404);
                }
                else {
                    res.send(200);
                }
            })*/
        }
        //validate request

        //look up user in db

        //format data

        //execute python pdf populator

        //update data in db for user

        //send appropriate response

    }

    function format_request_for_db(r){
        var mongo_obj = {};
        mongo_obj['name'] = r.name;
        mongo_obj['address'] = r.address;

    }

    function format_request_for_pdf(r) {
        var formatted_data = {};
        formatted_data['name'] = r.name.first_name + " " + r.name.last_name;
        formatted_data['address'] = r.address.street_address;
        formatted_data['apt'] = r.address.apt_number;
        formatted_data['zip'] = r.address.zip;
        formatted_data['city'] = cities.zip_lookup(r.address.zip).city;
        return formatted_data
    }

    function populate_pdf(data, cb){

        var exec = require('child_process').exec;

        var input = "python pdf.py ";
        input += "--Name='" + data.name + "' ";
        input += "--Address='" + data.address + "' ";
        input += "--Apt='" + data.apt + "' ";
        input += "--Zip='" + data.zip + "' ";
        input += "--City='" + data.city + "' ";

        exec(input, function(error, stdout, stderr){
            console.log("error: ");
            console.log(error);
            console.log("stdout: ")
            console.log(stdout);
            console.log("stderr: ")
            console.log(stderr);

            cb(null, "OK");

        })

    }


    return {
        "execute":execute
    }

}());

module.exports = PopulateApplication;