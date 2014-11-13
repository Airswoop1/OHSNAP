/**
 * Created by airswoop1 on 6/27/14.
 */
var fs = require('fs');
var phaxio_key = process.env.PHAXIO_TEST_KEY,
    phaxio_secret = process.env.PHAXIO_TEST_SECRET,
    AWS_ACCESS_KEY = process.env.AWS_ACCESS_KEY_ID,
    AWS_SECRET_KEY = process.env.AWS_SECRET_ACCESS_KEY;

module.exports = {
    "db" : {
        "mongodb" : "mongodb://127.0.0.1:27017/ohsnap-sandbox"
    },
    "aws" : {
        "s3" : {
            "accessKeyId": AWS_ACCESS_KEY,
            "secretAccessKey": AWS_SECRET_KEY,
            "region": "us-west-2"
        },
        "s3_bucket": "significance.labs.snapcoach.documents",
	    "s3_signature_bucket": "sandbox.easyfoodstamps.signatures",
	    "s3_apps_bucket":"sandbox.easyfoodstamps.applications"
    },
    "ssl" : {
        "key": fs.readFileSync('./config/ssl/sandbox/key.pem'),
        "cert": fs.readFileSync('./config/ssl/sandbox/cert.pem')
    },
    "web": {
        "http_port": 1337,
        "https_port" : 8080
    },
    "phaxio" : {
        "key": phaxio_key,
        "secret": phaxio_secret
    }
}
