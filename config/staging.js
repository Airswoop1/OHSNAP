/**
 * Created by airswoop1 on 7/24/14.
 */

var fs = require('fs');
var mongolab_pw = process.env.MONGOLAB_PW,
    phaxio_prod_key = process.env.PHAXIO_TEST_KEY,
    phaxio_prod_secret = process.env.PHAXIO_TEST_SECRET,
    AWS_ACCESS_KEY = process.env.AWS_SL_ACCESS_KEY_ID,
    AWS_SECRET_KEY = process.env.AWS_SL_ACCESS_KEY_ID;


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
        "s3_bucket":"staging.significancelabs.easyfoodstamps.documents"
    },
    "ssl" : {
        "key":fs.readFileSync('./config/ssl/sandbox/key.pem'),
        "cert":fs.readFileSync('./config/ssl/sandbox/cert.pem')
    },
    "web": {
        "http_port": 3000,
        "https_port" : 3001
    },
    "phaxio" : {
        "key":phaxio_prod_key,
        "secret":phaxio_prod_secret
    }

}