/**
 * Created by airswoop1 on 6/27/14.
 */
var fs = require('fs');
var mongolab_pw = process.env.MONGOLAB_PW,
    phaxio_key = process.env.PHAXIO_TEST_KEY,
    phaxio_secret = process.env.PHAXIO_TEST_SECRET;

module.exports = {
    "db" : {
        "mongodb" : "mongodb://sandbox:" + mongolab_pw + "@ds037447.mongolab.com:37447/ohsnap-sandbox"
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
    },
    "phaxio" : {
        "key":phaxio_key,
        "secret":phaxio_secret
    }

}


