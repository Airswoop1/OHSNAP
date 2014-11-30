var MongoClient = require('../database.js');


module.exports = function(req, res) {
    var user_id = req.body.user_id;
    var rating = req.body.rating;

    if(!user_id || !rating) {
        res.send(400, {message: 'incorrect parameters'});
        return;
    }

    MongoClient.getConnection(function(db_err, db) {
        if(db_err) {
            console.error(db_err);
            res.send(500, {message: 'error connecting to db'});
            return;
        }

        db.collection('feedback').update(
            {user_id: user_id},
            {
                user_id: user_id,
                rating: rating.value,
                feedback_message: req.body.feedback_message || '',
                rec_sms: req.body.sms_agree || false,
                created_on: (new Date()).getTime()
            },
            {upsert:true, multi: false},
            function(err, updated) {
                if(err) {
                    console.error(err);
                    res.send(500, {message: 'error inserting feedback into db'});
                    return;
                }

                res.send(201, {message: 'successfully uploaded user feedback'});
            });
    })
};
