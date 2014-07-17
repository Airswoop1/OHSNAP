/**
 * Created by airswoop1 on 7/15/14.
 */

var Phaxio = require('phaxio'),
    MongoClient = require('../database.js'),
    fs = require('fs'),
    config = require("../config.js"),
    phaxio = new Phaxio(config.phaxio.key,config.phaxio.secret);


var SendApplications = (function(){

    console.log("executing send applications");

    /*MongoClient.getConnection(function(db_err, db){
        if(db_err) {
            console.log(db_err);
            return;
        }
        else {
            var collection = db.collection('users'),
                query = {'completed':true, 'output_file_name':{'$exists':true}, 'faxed_form': false};

            collection.find(
                query,
                function(err, cursor){
                    if(err){
                        console.log("error with query in populate application!");
                        console.log(err);
                    }
                    else{
                        cursor.toArray(function(e, docs){

                            docs.forEach(faxApplication);

                        })
                    }

                    })

            }
        })*/

    function faxApplication(d) {

        var file_path = __dirname + "/../output/" + d.output_file_name,
            user_id = d.user_id;

        fs.exists(file_path, function(exists) {
            if(exists){
                phaxio.sendFax({
                    to:'8776849491',
                    filenames : file_path
                }, function(err, data) {
                    if(err){
                        console.log("Error sending fax!");
                        console.log(err);
                    }
                    else if(data.success) {
                       /*updateUserFaxStatus(user_id, data.faxId, function(fax_db_err, result){
                            if(fax_db_err) {
                                console.log(fax_db_err);
                            }
                           else {
                                return;
                            }
                       })*/
                        console.log("Success!");
                        console.log(data);
                    }


                });
            }
            else {
                console.log('Unable to find pdf to send.');
                return;
            }

        })
    }


    function updateUserFaxStatus(user_id, fax_id, cb) {
        MongoClient.getConnection(function(db_err, db){
            if(db_err) {
                console.log('error getting db in updateUserFaxStatus');
                cb(db_err);
            }
            else {
                var collection = db.collection('users'),
                    query = {"user_id": user_id},
                    update = {"$set": {"fax_id":fax_id, "faxed_form":true }};

                collection.findAndModify(
                    query,
                    [['_id','asc']],
                    update,
                    {"upsert":false, "multi": false},
                    function(db_write_err, result) {
                        if(db_write_err) {
                            console.log('error writing to the db to update fax send status for ' + user_id);
                            cb(db_write_err);
                        }
                        else {
                            console.log('updated fax send information');
                            cb(null, result);
                        }

                    })
            }
        })
    }




}());

module.exports = SendApplications;