/**
 * Created by airswoop1 on 9/30/14.
 */

var MongoClient = require('../../database.js');
var SendTM = require('./SendTextMessage');


var ReceiveSMSResponse = (function() {


	/** RESPONSE FROM OTHER PHONE
	 *
	 * { ToCountry: 'US',
	 ToState: 'NY',
	 SmsMessageSid: 'SM43cf27e4fd354424974a546e5c77ef09',
	 NumMedia: '0',
	 ToCity: 'HUNTINGTON',
	 FromZip: '07601',
	 SmsSid: 'SM43cf27e4fd354424974a546e5c77ef09',
	 FromState: 'NJ',
	 SmsStatus: 'received',
	 FromCity: 'HACKENSACK',
	 Body: 'Sup?',
	 FromCountry: 'US',
	 To: '+13474298954',
	 ToZip: '11743',
	 MessageSid: 'SM43cf27e4fd354424974a546e5c77ef09',
	 AccountSid: 'ACae2c29ee3a7ea1a79cb0ce655cca6666',
	 From: '+12016551789',
	 ApiVersion: '2010-04-01' }
	 *
	 */


	var execute = function(req, res) {


		if(typeof req.body === 'undefined'){
			res.status(500).end();
		}
		else {

			var userRequest = req.body;

	        //determine which message it's responding to
			lookUpNumber(function(err) {
				if(err) {
					console.error("error on looking up number for " + userRequest.From);
					console.error(err);
					res.status(500).end();
				}
				else if( userRequest.retries > 4 ){
					storeMessageInDBAnyway();
					res.status(500).end();
				}
				else {

					determineResponseMessage(function(err, responseMessage) {
						if(err) {
							storeMessageInDBAnyway();
							res.status(500).end();
						}
						else {
							sendMessageAndStoreInDB(responseMessage, function(err){
								if(err){
									console.error("error on sending message for " + userRequest.From);
									console.error(err);
									res.status(500).end();
								}
								else {
									res.status(200).end();
								}
							})
						}
					})
				}

			});
		}

		function lookUpNumber(cb) {
			MongoClient.getConnection(function(db_err, db){

				if(db_err) { cb(db_err); }
				else {
					var collection = db.collection('calls'),
						query = {
							'number' : userRequest.From
						};

					collection.findOne(query, function(err, result){

						result["retries"] = (typeof result.retries === 'undefined') ? 0 : result.retries;
						userRequest['userData'] = result;

						cb(err);
					})
				}
			})
		}

		function determineResponseMessage(cb) {

			var answer,
				yes_re = /yes/g,
				no_re = /no/g;

			userRequest.Body = userRequest.Body.toLowerCase();

			if(yes_re.exec(userRequest.Body)) {
				answer = 'yes';
			}
			else if(no_re.exec(userRequest.Body)) {
				answer = 'no';
			}
			else if(userRequest.userData.sequence_num == 1) {
				userRequest.userData.sequence_num--;
				userRequest.userData.retries++;
				cb(null, 'Sorry, we can\'t parse your response please send again!');
			}
			else {
				cb('error');
			}

			switch(userRequest.userData.type) {
				case 'ALL_THE_WAY' :
					if(userRequest.userData.sequence_num == 1) {
						if(answer == 'yes'){
							cb(null, 'Great! Are you approved to get food stamps? Please reply Yes or No');
						}
						else if(answer == 'no') {
							userRequest.userData.sequence_num = 10;
							cb(null, 'Ah, sorry to hear that. Have you followed up with the HRA? Please reply Yes or No');
						}
					}


					else if(userRequest.userData.sequence_num == 2){
						if(answer == 'yes'){
							cb(null, 'Great! Thanks for letting us know. If you don\'t mind sharing with us can you tell us what your monthly amount is?' );
						}
						else if(answer == 'no') {
							cb(null, 'Ah, sorry to hear that. What\'s the reason they provided?');
						}
						else {
							userRequest.userData.sequence_num = -1;
							cb(null, "Thanks for letting us know.");
						}
					}
					else if(userRequest.userData.sequence_num == 3){
						cb(null, "Thanks for letting us know.");
					}



					else if(userRequest.userData.sequence_num == 11) {
						if(answer == 'yes') {
							cb(null, 'Awesome, what have you done?');
						}
						else if(answer == 'no') {
							userRequest.userData.sequence_num = -1;
							cb(null, 'Got it. If you\'d like you can try calling 718-722-8013 and selecting 3, then 5, then 4 at each menu prompt to reach a human!');
						}
					}
					else if(userRequest.userData.sequence_num == 12) {
						userRequest.userData.sequence_num = -1;
						cb(null, "Thanks for letting us know.");
					}


				break;
				case 'NO_DOCS' :
					if(userRequest.userData.sequence_num == 1) {
						if(answer == 'yes'){
							cb(null, 'Great! Have you heard back from the HRA since you sent in your docs? Please reply Yes or No');
						}
						else if(answer == 'no') {
							userRequest.userData.sequence_num = 10;
							cb(null, 'Ah, sorry to hear that. Have you followed up with the HRA? Please reply Yes or No');
						}
					}


					else if(userRequest.userData.sequence_num == 2){

						if(answer == 'yes'){
							cb(null, 'Great! Are you currently receiving food stamps? Please reply Yes or No');
						}
						else if(answer == 'no') {
							userRequest.userData.sequence_num = 10;
							cb(null, 'Ah, sorry to hear that. Have you followed up with the HRA? Please reply Yes or No ');
						}
					}
					else if(userRequest.userData.sequence_num == 3){
						if(answer == 'yes'){
							cb(null, 'Great! Thanks for letting us know. If you don\'t mind sharing with us can you tell us what your monthly amount is?' );
						}
						else if(answer == 'no') {
							cb(null, 'Ah, sorry to hear that. What\'s the reason they provided?');
						}
						else {
							userRequest.userData.sequence_num = -1;
							cb(null, "Thanks for letting us know.");
						}
					}
					else if(userRequest.userData.sequence_num == 4){
						cb(null, "Thanks for letting us know.");
					}

					else if(userRequest.userData.sequence_num == 11) {
						if(answer == 'yes') {
							cb(null, 'Awesome, what have you done?');
						}
						else if(answer == 'no') {
							userRequest.userData.sequence_num = -1;
							cb(null, 'Got it. If you\'d like you can try calling 718-722-8013 and selecting 3, then 5, then 4 at each menu prompt to reach a human!');
						}
					}
					else if(userRequest.userData.sequence_num == 12) {
						userRequest.userData.sequence_num = -1;
						cb(null, "Thanks for letting us know.");
					}


				break;
				case 'NO_CONTACT' :
					if(userRequest.userData.sequence_num == 1) {
						if(answer == 'yes'){
							cb(null, 'Great! Are you currently receiving food stamps? Please reply Yes or No');
						}
						else if(answer == 'no') {
							userRequest.userData.sequence_num = 10;
							cb(null, 'Ah, sorry to hear that. Have you followed up with the HRA? Please reply Yes or No');
						}
					}
					else if(userRequest.userData.sequence_num == 2){
						if(answer == 'yes'){
							cb(null, 'Great! Thanks for letting us know. If you don\'t mind sharing with us can you tell us what your monthly amount is?' );
						}
						else if(answer == 'no') {
							cb(null, 'Ah, sorry to hear that. What\'s the reason they provided?');
						}
						else {
							userRequest.userData.sequence_num = -1;
							cb(null, "Thanks for letting us know.");
						}
					}

					else if(userRequest.userData.sequence_num == 3){
						cb(null, "Thanks for letting us know.");
					}



					else if(userRequest.userData.sequence_num == 11) {
						if(answer == 'yes') {
							cb(null, 'Awesome, what have you done?');
						}
						else if(answer == 'no') {
							userRequest.userData.sequence_num = -1;
							cb(null, 'Got it. If you\'d like you can try calling 718-722-8013 and selecting 3, then 5, then 4 at each menu prompt to reach a human!');
						}
					}
					else if(userRequest.userData.sequence_num == 12) {
						userRequest.userData.sequence_num = -1;
						cb(null, "Thanks for letting us know.");
					}


				break;
				default:
					cb('err');
				break;

			}



		}

		function sendMessageAndStoreInDB(msg, cb) {
			MongoClient.getConnection(function(db_err, db){
				if(db_err) { cb(db_err); }
				else {
					SendTM.send_sms(msg, userRequest.From, function(err, res){
						if(err) { cb(err,res); }
						else {
							var collection = db.collection('calls'),
								query = {
									'number':userRequest.From
								},
								update = {'$set':{}};

								update['$push'] = {'response_array' : { 'body' : userRequest.Body, 'num':userRequest.userData.sequence_num }, 'sent_array' : msg },

								update['$set'] = {
									'sequence_num' : ++userRequest.userData.sequence_num,
									'retries' : userRequest.userData.retries
								};

							collection.update(query, update, {'upsert':false, 'multi':false}, cb);
						}//else
					});//send_sms
				}//else
			});//mc
		}//fn


		function storeMessageInDBAnyway() {
			MongoClient.getConnection(function(db_err, db){
				if(db_err) { console.error(db_err); }
				else {
					var collection = db.collection('calls'),
						query = {
							'number':userRequest.From
						},
						update = {};

					update['$push'] = {'response_array' : { 'body' : userRequest.Body, 'num':userRequest.userData.sequence_num } };

					collection.update(query,update,{},function(err,res){
						if(err) { console.error(err); }
					})


				}
			});
		}

	};


	return {
		'execute':execute
	}

}())



module.exports = ReceiveSMSResponse;