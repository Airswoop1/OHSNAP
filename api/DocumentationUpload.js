/**
 * Created by airswoop1 on 6/24/14.
 */

var config = require('../config.js'),
    MongoClient = require('../database.js'),
    AWS = require('aws-sdk'),
    s3 = require('s3policy'),
    path = require('path'),
    fs = require('fs');

var DocumentationUpload = (function(){

    var ResponseCodes = {
        "success" : {
            "code": "201",
            "message" : "successfully uploaded document to server"
        },
        "bad_request": {
            "code": "400",
            "message": "request missing required parameters"
        },
        "unable_to_upload" : {
            "code": "403",
            "message": "unable to upload document to server"
        },
        "db_failure" : {
            "code": "500",
            "message":"db write error"
        }

    };

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

    var Request  = function() {
        this.file = undefined;
        this.user_id = undefined;
        this.document_type = undefined;
    };

    var  Response = function() {
        this.code = undefined;
        this.message = undefined;
    };

    var execute = function(req, res){

        console.log("executing documentation upload")
        console.log(req.body);
        console.log(req.files);

        var request = new Request();
        request.user_id = req.body.user_id;
        request.document_type = req.body.document_type;
        request.file = req.files.file;


        if(request.user_id && request.document_type && request.file) {

            var current_time = new Date().getDate(),
                file = req.files.file,
                tmpPath = file.path,
                tmpName = file.name + current_time.toString(),
                my_path = path.join(__dirname, '../uploaded/',file.name);



            fs.readFile(tmpPath, function (err, data) {
                fs.writeFile(my_path, data, function (err) {
                    if(err) {
                        console.log("error");
                        console.log(err);
                        throw err;
                    }
                    else {
                        updateDBForFile(request, function(db_file_err){
                            if(db_file_err){
                                console.log("error saving upload document information to db");
                                console.log(db_file_err);
                                var response = new Response();
                                response = ResponseCodes['db_failure'];
                                res.send(400)
                            }
                            else{
                                var proper_file_name= request.user_id + "_" + request.document_type;

                                storeFileOnAWS(my_path, proper_file_name, function(err, result){
                                    var response = new Response();
                                    if(err){
                                        response = ResponseCodes['unable_to_upload']
                                        console.log(err);
                                        res.send(403, response);
                                    }
                                    else {
                                        response = ResponseCodes['success'];
                                        res.send(201, response);
                                    }

                                });
                            }
                        })
                    }
                });
            });
        }
        else {
            var response = new Response();
            response = ResponseCodes['bad_request'];
            res.send(400, response);
        }
    };

    function updateDBForFile(request, cb) {

        MongoClient.getConnection(function(db_err,db){
            if(db_err){
                cb(db_err,null);
            }
            else {

                var collection = db.collection('users'),
                    doc_type = DocumentTypes[request.document_type],
                    query = {'user_id':request.user_id},
                    update = {"$set":{}};

                update.$set[doc_type] = {"file_name": request.file.name, "file_type": request.file.type };

                collection.findAndModify(query,[],update,function(err,res){
                    cb(err,res);
                })

            }
        });

    };

    function storeFileOnAWS(path, name, cb){
        //var aws_config = new AWS.Config(config.aws.s3);
        AWS.config.update({"region": "us-west-2"});
        var storage = new AWS.S3();

        fs.readFile(path, function(err, data){
            if(err){
                cb(err,null);
            }
            else {

                var params = {
                    Bucket: config.aws.s3_bucket,
                    Key: name,
                    ACL:'authenticated-read',
                    Body: data,
                    ServerSideEncryption:"AES256"
                };

                storage.createBucket( {Bucket:config.aws.s3_bucket}, function(){

                    storage.putObject(params, function(storage_err, data){
                        if(storage_err){
                            cb(storage_err, null);
                        }
                        else {
                            console.log("Stored file successfully!");
                            console.log(data);
                            cb(null, data);
                        }
                    })
                })
            }
        })

    }

    return {
        "execute":execute
    }

}())

module.exports = DocumentationUpload