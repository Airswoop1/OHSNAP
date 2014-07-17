/**
 * Created by airswoop1 on 6/23/14.
 */
var fs = require('fs');
var mongolab_pw = process.env.MONGOLAB_PW,
    phaxio_prod_key = process.env.PHAXIO_PROD_KEY,
    phaxio_prod_secret = process.env.PHAXIO_PROD_SECRET;


module.exports = {
    "db" : {
        "mongodb" : "mongodb://dev:"+ mongolab_pw +"@ds041198.mongolab.com:41198/ohsnap-dev"
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

}

