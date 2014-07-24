/**
 * Created by airswoop1 on 6/23/14.
 */
var fs = require('fs');
var mongolab_pw = process.env.MONGOLAB_PW,
    phaxio_prod_key = process.env.PHAXIO_PROD_KEY,
    phaxio_prod_secret = process.env.PHAXIO_PROD_SECRET,
    AWS_ACCESS_KEY = process.env.AWS_ACCESS_KEY_ID,
    AWS_SECRET_KEY = process.env.AWS_SECRET_ACCESS_KEY;


module.exports = {
    "db" : {
        "mongodb" : "mongodb://dev:"+ mongolab_pw +"@ds041198.mongolab.com:41198/ohsnap-dev"
    },
    "aws" : {
        "s3" : {
            "accessKeyId": AWS_ACCESS_KEY,
            "secretAccessKey": AWS_SECRET_KEY,
            "region": "us-west-2"
        },
        "s3_bucket":"significance.labs.snapcoach.documents"
    },
    "ssl" : {
        "key":fs.readFileSync('./config/ssl/ssl.key'),
        "cert":fs.readFileSync('./config/ssl/ssl.crt'),
        "ca":fs.readFileSync('./config/ssl/sub.class1.server.ca.pem')
    },
    "web": {
        "http_port": 3000,
        "https_port" : 3001
    },
    "phaxio" : {
        "key":phaxio_prod_key,
        "secret":phaxio_prod_secret
    }

};

