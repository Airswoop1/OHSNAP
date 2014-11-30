/**
 * Created by airswoop1 on 8/3/14.
 */
var MongoClient = require('../database.js');


module.exports = function(req, res) {
	var userId = req.body.user_id;
	if (!userId) {
		console.log(req.body);
		return res.send(400, {message: "input data incorrect"});
	}

	MongoClient.getConnection(function(db_err, db) {
		if(db_err) {
			return res.send(404, {message: 'error connecting to db'});
		}

		var collection = db.collection('users');
		var query = {user_id: userId};
		req.body.last_modified = new Date().getTime();
		req.body.created_on_readable = new Date().toLocaleString();

		collection.update(
			query,
			{$set: req.body},
			{upsert: false, multi: false},
			function (err, updated) {
				if (err) {
					console.error('error writing to the db for user: ', userId, err);
					res.send(500, {message: 'error writing to db'});
					return;
				}

				res.send(201, {message: 'successfully updated user data'});
			});
	});
};
