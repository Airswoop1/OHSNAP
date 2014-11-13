console.log('Initializing OHSNAP... ');
//require('monitor').start();

var express = require('express');
var http = require('http');
var https = require('https');
var path = require('path');
var cons = require('consolidate')
var compression = require('compression')
var ip = require('ip')
var i18n = require('i18n-2');
var swig = require('swig');

var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var cookieSession = require('cookie-session');

var api = require('./api/api.js');
var config = require('./config.js');


var app = express();
var server = http.createServer(app);
var https_server = https.createServer(config.ssl, app);

app.use(compression())

i18n.expressBind(app, {
    locales: ['en', 'es'],
    defaultLocale: 'en',
    cookieName: 'locale',
    query: true
});


swig.setDefaults({varControls: ['<%=', '%>']});
app.engine('html', cons.swig);
app.set('view engine', 'html');
app.set('views', path.join(__dirname, 'views'));

app.set('port', config.web.http_port);

app.use(function(req, res, next) {
    req.i18n.setLocaleFromCookie();
    req.i18n.setLocaleFromQuery();
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
console.log('Environment:', env);

if (env == 'sandbox') {
    app.use(express.logger());
    app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
}
else if (env == 'prod' || env == 'production') {
    app.use(express.errorHandler());
    app.use(function(req, res, next) {
        if(req.connection.encrypted) {
            next();
            return;
        }
        res.redirect('https://' + req.headers.host + req.url);
    });
}

app.get('/es', function(req, res) {
    req.i18n.setLocale('es');
    var greeting = req.i18n.__('Hello');
    res.send(200, greeting);
});

app.get('/', function(req, res) {
    res.render('index', {});
});

app.get(/(.*)\.html/, function(req, res) {
    res.render(req.route.params[0].slice(1), {});
});

app.use(express.static('public'));
api.set_routes(app);

server.listen(app.get('port'), function () {
    console.log('HTTP now listening on ' + app.get('port'));
    console.log('Url: ' + ip.address())
});

https_server.listen(config.web.https_port, function(){
    console.log('HTTPS now listening on port ' + config.web.https_port)
    console.log('Completed Node initialization: ' + new Date());
})