// Twilio Credentials 
var accountSid = process.env.sl_TWILIO_LIVE_ACCOUNT_SID;
var authToken = process.env.sl_TWILIO_LIVE_AUTH_TOKEN;
//var from_number = "+15005550006"; //test
var from_number = "+13474298954"; //LIVE
var status_callback_url = "http://dev.easyfoodstamps.com/receive_twilio_response";

//require the Twilio module and create a REST client 
var client = require('twilio')(accountSid, authToken);


var SendSMS = (function(){


	var send_sms = function(msg, to_number, callback) {

		client.messages.create({
			to: to_number,
			from: from_number,
			body: msg,
			statusCallback: status_callback_url
		}, callback);
	};


	return {
		'send_sms' : send_sms
	}



}());

module.exports = SendSMS;


