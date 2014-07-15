/**
 * Created by airswoop1 on 7/15/14.
 */

var request = require('request'),
    MongoClient = require('../database.js');


var SendApplications = (function(){

    console.log("executing send applications");

    MongoClient.getConnection(function(db_err, db){
        if(db_err) {
            console.log(db_err);
            return;
        }
        else {
            var collection = db.collection('users'),
                query = {'completed':true, 'output_file_path':{'$exists':true}, 'faxed_form': false};

            collection.find(
                query,
                function(err, cursor){
                    if(err){
                        console.log("error with query in populate application!");
                        console.log(err);
                    }
                    else{
                        cursor.toArray(function(e, docs){

                            docs.forEach(faxApplication);

                        })
                    }

                    })

            }
        })


    function faxApplication(d) {

    }


}());

module.exports = SendApplications;