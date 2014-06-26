console.log("Initializing... ");

var express = require("express");
var http = require("http");
var https = require('https');
var path = require("path");
var os = require("os");

var api = require("./api/api.js");
var cors = require("cors");
var config = require('./config.js');

var app = express();
var server = http.createServer(app);
var https_server = https.createServer(config.ssl, app);
//var hl_socket = require("./hl_socket.js")(server);


app.set('port', process.env.PORT || 1337);

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
    console.log('listening on port ' + app.get('port') + " started:  ");
    console.log('Url: ' + os.hostname())
    console.log("Completed Node initialization: " + new Date());
});

https_server.listen(8080, function(){
    console.log("HTTPS now listening on port 8080")
    console.log("Completed https initialization");
})