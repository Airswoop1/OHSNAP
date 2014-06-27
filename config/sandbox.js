/**
 * Created by airswoop1 on 6/27/14.
 */
var fs = require('fs');
module.exports = {
    "db" : {
        "mongodb" : "mongodb://ohsnap:lastmorning123@ds041198.mongolab.com:41198/ohsnap-dev"
    },
    "aws" : {
        "s3" : {
            "accessKeyId": "AKIAICYB4XMMX4WC2CXQ",
            "secretAccessKey": "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",
            "region": "us-west-2"
        },
        "s3_bucket":"significance.labs.snapcoach.documents"
    },
    "ssl" : {
        "key":fs.readFileSync('./config/ssl/sandbox/key.pem'),
        "cert":fs.readFileSync('./config/ssl/sandbox/cert.pem')
    },
    "web": {
        "http_port": 1337,
        "https_port" : 8080
    }

}


