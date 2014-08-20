/**
 * Created by airswoop1 on 7/24/14.
 */

var Phaxio = require('phaxio'),
	MongoClient = require('../database.js'),
    fs = require('fs'),
    config = require("../config.js"),
    phaxio = new Phaxio(config.phaxio.key,config.phaxio.secret);


var SendDocuments = (function() {

	var execute = function(user_id){

		var file_path = "./output/docs/" + user_id + "_COMPLETE.pdf",
			alt_file_path = "./output/Signed_SNAP_Application_" + user_id.split("-").join("") + ".pdf",
			phone = "9176391111";

		fs.exists(file_path, function(exists) {
			if(exists){
				sendFax(phone, file_path, user_id);

			}
			else {
				exists = undefined;
				fs.exists(alt_file_path, function(exists) {
					if(exists) {
						sendFax(phone, alt_file_path, user_id);
					}
					else {
						console.log('Unable to find pdf to send for ' + user_id);
						return;
					}
				})
			}
		});

	};

	function sendFax(phone, file_path, user_id) {
		phaxio.sendFax({
			to:phone,
			filenames : file_path
		}, function(err, data) {
			if(err){
				console.log("Error sending docs + app fax for: " + user_id);

			}
			else if(data.success) {
				console.log("sent test fax");
				updateDBDocsSent(user_id, data.faxId, function(fax_db_err, result){
					if(fax_db_err) {
						console.log(fax_db_err);
						console.log("did not update db for: " + user_id);
					}
					else {
						console.log('done updating db: sent fax for user ' + user_id);
					}
				});
			}
			else {
				console.log("error while sending app + docs for: " + user_id);
				console.log(data);
			}
		});
	}

	function updateDBDocsSent(user_id, fax_id, cb){

		MongoClient.getConnection(function(db_err, db){
			if(db_err) {
				console.log(db_err);
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
		});

	}

	return {
		"execute":execute
	}

} ());

module.exports = SendDocuments;