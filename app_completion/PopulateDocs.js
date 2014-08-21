var AWS = require('aws-sdk'),
	s3 = require('s3policy'),
	MongoClient = require('../database.js'),
	fs = require('fs'),
	exec = require('child_process').exec,
	config = require("../config.js"),
	SendDocuments = require('./SendDocuments.js');


var PopulateDocs = (function() {

	console.log("Getting Documents via DB/AWS...")

	var DocumentTypes = {

		'IDENTITY':'identity',
		'RESIDENCE':'residence',
		'HOUSEHOLD_COMPOSITION':'household_composition',
		'AGE':'age',
		'SSN':'ssn',
		'CITIZENSHIP':'citizenship',
		'ALIEN_STATUS':'alien_status',
		'EARNED_INCOME':'earned_income',
		'UNEARNED_INCOME':'unearned_income',
		'RESOURCES' : 'resources'
	};


	MongoClient.getConnection(function(db_err, db){
		if(db_err) {
			console.log(db_err);
		}
		else {
			var collection = db.collection('users'),
				//query = {'completed':true, 'documents':{'$exists':true} };
				//query = {'created_on':{'$lt':1407798000000}, 'documents':{'$exists':true} };
				//query = {'user_id':"99d7b2cf-464c-4e32-aa79-ec4ae1b4f629"};
				query = {"documents":{'$exists':true} ,'created_on':{'$gt':1407798000000}}

			collection.find(
				query,
				function(err, cursor){
					if(err){
						console.log("error with query Populate Docs!");
						console.log(err);
					}
					else{
						cursor.toArray(function(e, docs){
							console.log(docs.length);
							docs.forEach(prepAndPopulateDocs);

						})
					}
				})
		}
	});

		function prepAndPopulateDocs(user) {
			getDocs(user, function(err, result){
				if(err){
					console.log(err);
				}
				else {
					var user_id = user.user_id,
						index = 0;

					getDocumentsFromS3(result, index, user_id, function(doc_array, i, user_id, cb){
						if(i == doc_array.length){
							createPDFfromImages(doc_array, user_id);
						}
						else {
							getDocumentsFromS3(doc_array, i, user_id, cb);
						}
					});
				}

			})
		}

	function getDocs(user, cb) {
		var docs = user.documents,
			docFileNames = [];


		for(var d in docs){
			var extension = docs[d].file_name.split('.')[1];
			if(docs[d].name !== null && typeof docs[d].name !== 'undefined'){
				docFileNames.push(user.user_id + "_" + docs[d].name.toUpperCase() + "." + extension);
			}
		}
		cb(null, docFileNames);
	}


	function getDocumentsFromS3(doc_array, index, user_id, cb) {
		AWS.config.update({"region": "us-west-2"});
		var storage = new AWS.S3(),
			doc_name = doc_array[index];

		storage.getObject({Bucket: config.aws.s3_bucket, Key: doc_name}, function(err, data) {

			if(err) {
				console.log("error getting file downloaded for : " + user_id);
				console.log(err);
				doc_array[index] = null;
				index++;

				cb(doc_array, index, user_id, cb);

			}
			else if(typeof data.Body !== 'undefined'){
				fs.writeFile('./output/docs/' + doc_name, new Buffer(data.Body), function(err, res){
					if(err){
						console.log("error writing file from s3");
						doc_array[index] = null;
						index++;
						cb(doc_array, index, user_id, cb);

					}
					else{
						index++;
						cb(doc_array, index, user_id, cb);
					}


				});
			}
			else {
				console.log("data.Body is undefined for a given file for user : " + user_id);
				doc_array[index] = null;
				index++;

				cb(doc_array, index, user_id, cb);
			}
		});
	}

	function createPDFfromImages(doc_array, user_id) {
		var py_command = "python ./app_completion/attach_docs.py ",
			null_ct = 0;

			py_command += "--ID='" + user_id + "' ";


		for(var i=0;i<doc_array.length;i++){
			if(doc_array[i]==null){
				null_ct++;
			}
			else {
				py_command += "--Doc" + (i+1) + "='" + doc_array[i] + "' ";
			}

		}

		if(null_ct !== doc_array.length){

			exec(py_command, function(error, stdout, stderr){

				if(error || stderr) {
					console.log('error creating single file for ' + user_id );
					console.log(error);
					console.log(stderr);
					SendDocuments.execute(user_id);
				}
				else {
					//delete image files?
					//mark in DB created single file?
					combineAppAndDocs(user_id);
					console.log("sucecssfully created single file for " + user_id);
				}
			})
		}
		else {
			SendDocuments.execute(user_id);
		}
	}

	function combineAppAndDocs(user_id) {
		var py_command = "python ./app_completion/combine_app_and_docs.py --ID='" + user_id + "'";

		exec(py_command, function(error, stdout, stderr){
			if(error || stderr){
				console.log('error combining files for ' + user_id );
				console.log(error);
				console.log(stderr);
			}
			else {
				console.log("combined app and docs for " + user_id);
			}
			SendDocuments.execute(user_id);
		});



	}


} ());

module.exports = PopulateDocs;
