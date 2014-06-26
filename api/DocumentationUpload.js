/**
 * Created by airswoop1 on 6/24/14.
 */

var config = require('../config.js');
var AWS = require('aws-sdk');
var s3 = require('s3policy');

var path = require('path');
var fs = require('fs');

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

    }

    var Request  = function() {
        this.file_name = undefined;
        this.user_id = undefined;
        this.document_type = undefined;
    }

    var  Response = function() {
        this.status = undefined;

    }

    function storeFileOnAWS(path, name, cb){
        var aws_config = new AWS.Config(config.aws.s3);
        AWS.config.update({"region": "us-west-2"})
        var storage = new AWS.S3();

        fs.readFile(path, function(err, data){
            if(err){
                cb(err,null);
                return;
            }
            else {

                var params = {
                    Bucket: config.aws.s3_bucket,
                    Key: name,
                    ACL:'authenticated-read',
                    Body: data
                }
                storage.createBucket({Bucket:config.aws.s3_bucket}, function(){

                    storage.putObject(params, function(storage_err, data){
                        if(storage_err){
                            cb(storage_err,null);
                            return;
                        }
                        else {
                            console.log("Stored file successfully!");
                            console.log(data);
                            cb(null, data);
                            return;
                        }
                    })
                })

            }



        })

    }

    var execute = function(req, res){


        var current_time = new Date().getDate();

        var file = req.files.file;
        var tmpPath = file.path;
        var tmpName = file.name + current_time.toString();
        var my_path = path.join(__dirname, '../uploaded/',file.name);


        fs.readFile(tmpPath, function (err, data) {
            fs.writeFile(my_path, data, function (err) {
               if(err) {
                   console.log("error");
                   console.log(err);
                   throw err;
               }
                else {

                   storeFileOnAWS(my_path, file.name, function(err, result){
                       if(err){
                           console.log(err);
                           res.send(500);
                       }
                       else {
                           res.send(200);
                       }

                   });
               }
            });
        });



    }

    return {
        "execute":execute
    }

}())

module.exports = DocumentationUpload