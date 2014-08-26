/**
 * Created by airswoop1 on 7/24/14.
 */

var fs = require('fs');
var mongolab_pw = process.env.MONGOLAB_PW,
    phaxio_test_key = process.env.PHAXIO_TEST_KEY,
    phaxio_test_secret = process.env.PHAXIO_TEST_SECRET,
    AWS_ACCESS_KEY = process.env.AWS_SL_ACCESS_KEY_ID,
    AWS_SECRET_KEY = process.env.AWS_SL_SECRET_ACCESS_KEY;


module.exports = {
    "db" : {
        "mongodb" :  "mongodb://ohsnap-staging:" + mongolab_pw + "@ds053439.mongolab.com:53439/staging"
    },
    "aws" : {
        "s3" : {
            "accessKeyId": AWS_ACCESS_KEY,
            "secretAccessKey": AWS_SECRET_KEY,
            "region": "us-west-2"
        },
        "s3_bucket":"staging.significancelabs.easyfoodstamps.documents",
	    "s3_signature_bucket": "staging.easyfoodstamps.signatures"
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
        "key":phaxio_test_key,
        "secret":phaxio_test_secret
    }

}