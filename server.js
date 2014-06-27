console.log("Initializing OHSNAP... ");

var express = require("express");
var http = require("http");
var https = require('https');
var path = require("path");
var os = require("os");
var ip = require("ip")
var cors = require("cors");

var api = require("./api/api.js");
var config = require('./config.js');

var app = express();
var server = http.createServer(app);
var https_server = https.createServer(config.ssl, app);


app.set('port', process.env.PORT || config.web.http_port);
app.set('view engine', 'html');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.urlencoded());
app.use(express.bodyParser());
app.use(express.cookieParser('asdfa9asdfxxc0'));
app.use(cors())
app.use(app.router);
app.use(express.static('public'));
app.set('views', path.join(__dirname, 'views'));

api.set_routes(app);


server.listen(app.get('port'), function () {
    console.log('HTTP now listening on ' + app.get('port'));
    console.log('Url: ' + ip.address())

});

https_server.listen(config.web.https_port, function(){
    console.log("HTTPS now listening on port " + config.web.https_port)
    console.log("Completed Node initialization: " + new Date());
})