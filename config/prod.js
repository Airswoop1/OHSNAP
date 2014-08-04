/**
 * Created by airswoop1 on 8/4/14.
 */

var fs = require('fs');
var mongolab_pw = process.env.MONGOLAB_PW,
	phaxio_prod_key = process.env.PHAXIO_PROD_KEY,
	phaxio_prod_secret = process.env.PHAXIO_PROD_SECRET,
	AWS_ACCESS_KEY = process.env.AWS_SL_ACCESS_KEY_ID,
	AWS_SECRET_KEY = process.env.AWS_SL_SECRET_ACCESS_KEY;


module.exports = {
	"db" : {
		"mongodb" : "mongodb://prod:"+ mongolab_pw + "@ds061189.mongolab.com:61189/prod"
	},
	"aws" : {
		"s3" : {
			"accessKeyId": AWS_ACCESS_KEY,
			"secretAccessKey": AWS_SECRET_KEY,
			"region": "us-west-2"
		},
		"s3_bucket":"significancelabs.easyfoodstamps.documents"
	},
	"ssl" : {
		"key":fs.readFileSync('./config/ssl/ssl.key'),
		"cert":fs.readFileSync('./config/ssl/ssl.crt'),
		"ca":fs.readFileSync('./config/ssl/sub.class1.server.ca.pem')
	},
	"web": {
		"http_port": 1337,
		"https_port" : 8080
	},
	"phaxio" : {
		"key":phaxio_prod_key,
		"secret":phaxio_prod_secret
	}

}