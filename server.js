console.log("Initializing OHSNAP... ");
//require('monitor').start();

var express = require("express");
var http = require("http");
var https = require('https');
var path = require("path");
var ip = require("ip")

var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var cookieSession = require('cookie-session');

var api = require("./api/api.js");
var config = require('./config.js');

var app = express();
var server = http.createServer(app);
var https_server = https.createServer(config.ssl, app);

var compression = require('compression')
app.use(compression())

var i18n = require("i18n-2");
i18n.expressBind(app, {
  // setup some locales - other locales default to vi silently
  locales: ['en', 'es'],
  // set the default locale
  defaultLocale: 'en',
  // set the cookie name
  cookieName: 'locale'
});


app.set('port', config.web.http_port);
app.set('view engine', 'html');

app.use(function(req, res, next) {
    req.i18n.setLocaleFromCookie();
    next();
});

app.use(express.favicon());
app.use(express.compress());
app.use(express.urlencoded());

app.use(cookieParser());
app.use(cookieSession({secret: 'asdfa9asdfxxc0'}));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

var env = app.get('env');
if (env == 'sandbox') {
    app.use(express.logger());
    app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
}
else if (env == 'prod') {
    app.use(express.errorHandler());
    app.use(function(req, res, next) {
        if(!req.connection.encrypted) {
            res.redirect('https://' + req.headers.host + req.url);
        }
        else {
            next();
        }
    });
}

app.use(express.static('public'));
app.set('views', path.join(__dirname, 'views'));

api.set_routes(app);

app.get('/es', function(req, res) {
  req.i18n.setLocale('es');
  var greeting = req.i18n.__('Hello');
  res.send(200, greeting);
});

server.listen(app.get('port'), function () {
    console.log('HTTP now listening on ' + app.get('port'));
    console.log('Url: ' + ip.address())
});

https_server.listen(config.web.https_port, function(){
    console.log("HTTPS now listening on port " + config.web.https_port)
    console.log("Completed Node initialization: " + new Date());
})