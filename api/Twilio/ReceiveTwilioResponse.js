
MongoClient = require('../../database.js');

var ReceiveTwilioResposne = (function() {

/**
 * RESPONSE FROM TWILIO
 * { SmsSid: 'SM5392f305d1e040e1819987699c7e680b',
  SmsStatus: 'sent',
  MessageStatus: 'sent',
  To: '+12016551789',
  MessageSid: 'SM5392f305d1e040e1819987699c7e680b',
  AccountSid: 'ACae2c29ee3a7ea1a79cb0ce655cca6666',
  From: '+13474298954',
  ApiVersion: '2010-04-01' }
 { SmsSid: 'SM5392f305d1e040e1819987699c7e680b',
  SmsStatus: 'delivered',
  MessageStatus: 'delivered',
  To: '+12016551789',
  MessageSid: 'SM5392f305d1e040e1819987699c7e680b',
  AccountSid: 'ACae2c29ee3a7ea1a79cb0ce655cca6666',
  From: '+13474298954',
  ApiVersion: '2010-04-01' }

 */


	var execute = function(req, res) {

		if(typeof req.body.MessageStatus !== 'undefined') {

			MongoClient.getConnection(function(db_err, db){
				if(db_err){console.log(db_err); return;}

				var collection = db.collection('calls'),
					query = { "phone": req.body.To },
					update = {'$set':{}};

				update['$set']['text_status'] = req.body.MessageStatus;

				collection.update(query, update, {'upsert':false, 'multi':false}, function(err, result) {

					if(err) {
						console.log(err);
						res.status(500).end();
						return;
					}

					console.log("updated sms status for " + req.body.To);
					res.status(200).end();
				})
			});
		}

	};


	return {
		'execute':execute
	}

}())



module.exports = ReceiveTwilioResposne;