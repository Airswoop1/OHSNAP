/**
 * Created by airswoop1 on 6/17/14.
 */
var MongoClient = require('../database.js');
var uuid = require('node-uuid');
var sanitizer = require('sanitizer');
var util = require('util');


function sanitize(data) {
  for(var key in data) {
    if(data.hasOwnProperty(key)) {
      var value = data[key];
      data[key] = typeof value === 'object' ?
        sanitize(value) : sanitizer.escape(value);
    }
  }
  return data;
}


module.exports = function(req, res) {
  var data = sanitize(req.body);
  if (!(data.name.first_name && data.name.last_name &&
      (data.phone_main || data.address.street_address))) {
    console.error('Request body not valid user data');
    res.send(400, {message: 'input data incorrect'});
    return;
  }

  MongoClient.getConnection(function(db_err, db) {
    if (db_err) {
      console.error(db_err);
      res.send(404, {message: 'error connecting to db'});
      return;
    }

    var query = {};
    var user_id = uuid.v4();

    data.user_id = user_id;
    data.created_on = (new Date()).getTime();

    db.collection('users').update(
      {user_id: user_id},
      data,
      {upsert: true, multi: false},
      function (err, updated) {
        if(err) {
          console.error('error writing to the db: ', err);
          res.send(500, {message: 'error writing to db'});
          return;
        }

        console.log('Sending response.', req, res);
        res.send(201, {
          message: 'successfully uploaded user data',
          user_id: user_id
        });
      })
  });
};
