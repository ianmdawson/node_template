'use strict';

var express = require('express');
var favicon = require('serve-favicon');
var morgan = require('morgan');

var app = express();

// SETTINGS
if ((app.get('env') !== 'production') && (app.get('env') !== 'test')) {
  app.set('env', 'development');
}
var config = require('./config/config.json')[app.get('env')];

app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
app.use(favicon('public/images/favicon.ico'));
// log every request
app.use(morgan('dev'));

// for SSL
app.use(function(req, res, next) {
  var host = req.get('host');
  if (((app.get('env') === 'production')) && req.get('x-forwarded-proto') === 'http') {
    res.redirect(301, 'https://' + host + req.url);
  } else {
    // see https://www.owasp.org/index.php/HTTP_Strict_Transport_Security
    res.set('Strict-Transport-Security', 'max-age=604800; includeSubDomains; preload');

    next();
  }
});

if (app.get('env') === 'production') {
  app.set('trust proxy', 1); // trust first proxy
}

// routes
require('./app/routes.js')(app); // load our routes and pass in our app and fully configured passport

module.exports = app;
