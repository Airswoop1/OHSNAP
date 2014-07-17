/**
 * Created by airswoop1 on 7/11/14.
 */

var MongoClient = require('../database.js');
var exec = require('child_process').exec;

var PopulateApplication = (function(){

    console.log("executing PopulateApplication")
    var success_ct = 0,
        error_ct = 0,
        total = 0;

        MongoClient.getConnection(function(db_err, db){
            if(db_err) {
                console.log(db_err);
                return;
            }
            else {

                var collection = db.collection('users'),
                    //query = {$or:[{'completed':{$exists:false}},{'completed':false}]};
                    query = {};

                    collection.find(query,
                        function(err, cursor){
                            if(err){
                                console.log("error with query!")
                                console.log(err);
                            }
                            else{
                             cursor.toArray(function(e, docs){

                                 total = docs.length;
                                 docs.forEach(processApp);
                                return;
                             })
                            }
                    });
            }
        })


    function processApp(data){
        format_request(data, function(formatted_data) {
            populate_pdf(formatted_data, function(err, result) {
                update_DB_pdfCreated(err, result);
            })
        })

    }

    function format_request(r, cb) {
        var formatted_data = {};

        formatted_data['name'] = r.name.first_name + " " + r.name.last_name;
        if(typeof r.address !== "undefined"){
            formatted_data['address'] = (typeof r.address.street_address === "undefined") ? " " : r.address.street_address;
            formatted_data['apt'] = (typeof r.address.apt_number === "undefined") ? " " : r.address.apt_number;
            formatted_data['zip'] = (typeof r.address.zip === "undefined") ? " " : r.address.zip;
        }
        formatted_data['phone_main'] = (typeof r.phone_main === "undefined") ? " " : r.phone_main;
        formatted_data['tmp_id'] = r.user_id.replace(/\-/g,'');
        formatted_data['user_id'] = r.user_id;

        cb(formatted_data);
    }

    function populate_pdf(data, cb){

        var input = "python ./app_completion/pdf.py ";
        input += "--Name='" + data.name + "' ";
        input += "--Address='" + data.address + "' ";
        input += "--Apt='" + data.apt + "' ";
        input += "--Zip='" + data.zip + "' ";
        input += "--Tel='" + data.phone_main + "' ";
        input += "--ID='" + data.tmp_id + "' ";

        exec(input, function(error, stdout, stderr){
            if(error || stderr) {

                error_ct++;
                cb(error,data.user_id);
            }
            else {
                success_ct++;
                cb(null, data.user_id);
            }

        })
    }

    function update_DB_pdfCreated(err, user_id) {

        var completed = err ? false : true,
            query = { "user_id" : user_id },
            update = {"$set": {'completed': completed}};

        MongoClient.getConnection(function(db_err, db) {
            if(db_err) {
               console.log  ('error saving pdf status to db');
               console.log(db_err);
            }
            else {
                var collection = db.collection('users');

                collection.findAndModify(
                    query,
                    [['_id','asc']],
                    update,
                    {"upsert":false, "multi": false},
                    function(db_write_err, result) {
                        if(db_write_err) {
                            console.log("db write error")
                        }
                        else {
                        }

                        if((error_ct+success_ct) === total){
                            console.log("successfully created " + success_ct + " pdfs!");
                            console.log("errored out on " + error_ct + " pdfs");
                            process.exit(0);
                        }
                    })

            }
        })


    }

}());

module.exports = PopulateApplication;