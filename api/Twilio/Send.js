/**
 * Created by airswoop1 on 10/1/14.
 */


var csv = require('csv'),
	fs = require('fs'),
	_ = require('underscore'),
	config = require('../../config.js'),
	MongoClient = require('../../database.js');

var SendTM = require('./SendTextMessage');

(function() {

	var map = [];

	fs.readFile(__dirname + '/to_text.csv', function(err, data) {
		if(err) {console.log(err);return;}

		/*SendTM.send_sms("all the way", "+12016551789", function(err, result) {
			storeResultInDB({'type':"ALL_THE_WAY",'number':'+12016551789', 'name':"Kevin Miller", 'message': "All the way"}, result, err);
		});*/

		csv.parse(data,{}, function(err, output) {
			if(err) {console.log(err);return;}

			_.each(output, function(element, index, list){
				var user_num = element[2].toString().trim();

				if(user_num[0]==='1' && user_num.length == 11){
					user_num = "+" + user_num;
				}
				else if(user_num.length == 10) {
					user_num = "+1" + user_num;
				}

				map.push({
					'type' : element[0],
					'name' : element[1],
					'number' : user_num
				})
			});

			console.log(map);

			var text_ct = -1;

			var text_interval = setInterval(function() {
				var msg;
				text_ct++;

				if(text_ct === map.length){
					clearInterval(text_interval);
					console.log("DONE SENDING MESSAGES!");
					return;
				}

				if(map[text_ct].type == 'NO_CONTACT') {
						msg = "Hi it's easyfoodstamps.com! A while back you submitted a food stamps application with us. Have you heard anything back from the HRA? Please reply Yes or No";
				}
				else if(map[text_ct].type == 'ALL_THE_WAY') {
					msg = "Hi it's easyfoodstamps.com! Since we last spoke have you gotten a letter about your food stamp eligibility? Please reply Yes or No";
				}
				else if(map[text_ct].type == 'NO_DOCS'){
					msg = "Hi it's easyfoodstamps.com! Since we last spoke have you submitted your documents to the HRA? Please reply Yes or No";
				}

				map[text_ct]['message'] = msg;

				SendTM.send_sms(msg, map[text_ct].number, function(err, result) {
					storeResultInDB(map[text_ct], result, err);
				});


			}, 4000);



		})
	})

	function storeResultInDB(obj, result, error) {
		MongoClient.getConnection(function(db_err, db){
			if(db_err) {

			}
			else {
				var calls = db.collection('calls'),
					query = {},
					insertion = {};

				query['phone'] = obj.number;

				insertion['number'] = obj.number;
				insertion['name'] = obj.name;
				insertion['type'] = obj.type;
				insertion['sequence_num'] = 1;
				insertion['text_status'] = (typeof result !== 'undefined') ? result.status : 'null';
				insertion['error'] = error;
				insertion['response_array'] = [];
				insertion['time_sent'] = new Date().getTime();
				insertion['sent_array'] = [ obj.message ];

				calls.update(query, insertion, {'upsert':true}, function(err, result) {
					if(err){
						console.log(err);
					}
					else {

						console.log('successfully updated db for ' + obj.number + " " + result);
					}

				})

			}
		});
	}


}());