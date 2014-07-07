console.log("Initializing OHSNAP... ");

var express = require("express");
var http = require("http");
var https = require('https');
var path = require("path");
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

app.use(function(req, res, next){
    if(!req.connection.encrypted && process.env.NODE_ENV === 'dev'){
        if(process.env.NODE_ENV == 'dev'){
            res.redirect('https://' + req.headers.host + req.url);
        }
        else if(process.env.NODE_ENV == 'sandbox'){
            res.redirect('https://' + req.headers.host.split(':')[0] + ":8080"+ req.url);
        }
        else{
            res.redirect('https://' + req.headers.host.split(':')[0] + ":8080"+ req.url);
        }
    }
    else {
        next();
    }
})

//app.use(app.router);
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