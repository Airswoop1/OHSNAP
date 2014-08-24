/**
 * Created by airswoop1 on 8/24/14.
 */

var MongoClient = require('../database.js'),
	fs = require('fs'),
	path = require('path');

var SignatureData = (function(){

	var execute = function(req, res) {
		if(typeof req.body.user_id !== 'undefined' && req.body.user_id.length === 36){

			var user_id = req.body.user_id,
				sig1_path = path.join( __dirname, '../uploaded/', user_id + "_1.png"),
				sig2_path = path.join( __dirname, '../uploaded/', user_id + "_2.png"),
				sig_regex = "data:image/png;base64,",
				formatted_sig1_data = req.body.sig1.replace(sig_regex,""),
				formatted_sig2_data = req.body.sig2.replace(sig_regex,"");


			fs.writeFile(sig1_path, new Buffer(formatted_sig1_data, 'base64'), function (err) {
				if(err) {
					console.log(err);
					res.send(404);
				}
				else {

					fs.writeFile(sig2_path, new Buffer(formatted_sig2_data, 'base64'), function (err) {
						if(err) {
							console.log(err);
							res.send(404);
						}
						else {
							updateDBForSig(user_id, function(err, result){
								if(!err) {
									console.log(result);
									res.send(200);
								}
								else {
									console.log(err);
									res.send(404);
								}
							})

						}

					});

				}
			});


		}
		else {
			res.send(404);
		}


	};

	function updateDBForSig(user_id, callback) {

		MongoClient.getConnection(function(db_err,db){
			if(db_err){
				callback(db_err, null);
			}
			else {
				var created_on = new Date().getTime(),
					collection = db.collection('users'),
					query = {'user_id':user_id},
					update = {"$set" : {'captured_sig':true, 'sig_captured_on':created_on}};

				collection.findAndModify(query,[],update, function(err,res){
					callback(err,res);
				})
			}
		});


	}


	return {
		'execute':execute
	}
}());

module.exports = SignatureData;