/**
 * Created by airswoop1 on 10/1/14.
 */
var SendTM = require('./SendTextMessage');

SendTM.send_sms("Hi it's easyfoodstamps.com! Since we last spoke have you submitted your documents to the HRA? Please reply Yes or No",
	"+12016551789", function(err, result) {
	console.error(err);
	console.log(result);
});


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
 *
 *
 *
 *
 * RESPONSE FROM OTHER PHONE
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