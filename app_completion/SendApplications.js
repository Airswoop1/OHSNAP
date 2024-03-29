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
	            opts = {"limit":50},
                query = {'completed':true, 'output_file_name':{'$exists':true}, "$or":[{'faxed_form': false}, {'faxed_form':{'$exists':false}}]};
	            //query = {'completed':true, 'output_file_name':{'$exists':true}, "$or":[{'faxed_form': true}, {'faxed_form':{'$exists':false}}]};

            collection.find(
                query,
	            opts,
                function(err, cursor){
                    if(err){
                        console.log("error with query in send application!");
                        console.log(err);
                    }
                    else{
                        cursor.toArray(function(e, docs){
                            console.log(docs.length);

                            docs.forEach(faxApplication);

                        })
                    }

                })

        }
    });*/
	var tempArray = ["SNAP_Application_39f9947b613d498a8afe93e425e2e089.pdf",
		"SNAP_Application_83df66bcaa5d48959292cf1738b89664.pdf",
		"SNAP_Application_abe1615efa754c519cd8bfe5ecb0cfce.pdf",
		"SNAP_Application_0175ca74bb3948938bde32db836b10c1.pdf",
		"SNAP_Application_3e3144af4f6a4544a7b6ce3f80f8ecc3.pdf",
		"SNAP_Application_6af751fa14144170862aab47e13b6678.pdf",
		"SNAP_Application_b67db5e95f6846129583af6364a10a03.pdf",
		"SNAP_Application_d1fd56997cca4de58eabd05dfabcaae9.pdf",
		"SNAP_Application_587e5177f5d242c5ab57378a924434b3.pdf" ];
	tempArray.forEach(faxApplication);

    function faxApplication(d) {

	    var file_path = __dirname + "/../output/Signed_" + d,
		    user_id = "";

        /*var file_path = __dirname + "/../output/Signed_" + d.output_file_name,
            user_id = d.user_id;*/

        /*if(typeof d.address === 'undefined') {
            var phone = '9176392483';
        }
        else {

            if( d.address.city === 'Bronx') {
                var phone =  '9176392473'; //Concourse
            }
            else if(d.address.city === 'New York' || d.address.city === 'Manhattan') {
                var phone = '9176392504'; //Waverly
            }
            else {
                var phone = '9176392483'; //Fort Greene
            }
        }*/

	    var phone = "9176391111";

        fs.exists(file_path, function(exists) {
            if(exists){
                phaxio.sendFax({
                    to:phone,
                    filenames : file_path
                }, function(err, data) {
                    if(err){
                        console.log("Error sending fax for: " + user_id);

                    }
                    else if(data.success) {
                        updateUserFaxStatus(user_id, data.faxId, function(fax_db_err, result){
                            if(fax_db_err) {
                                console.log(fax_db_err);
								console.log("did not update db for: " + user_id);
                            }
                            else {
                                console.log('done');
                            }
                        });
                    }
                    else {

                        console.log("error while sending: " + user_id);
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
        console.log("test fax sent for " + user_id);
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