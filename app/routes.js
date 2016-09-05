// app/routes.js
'use strict';

var moment = require('moment');
var Promise = require('bluebird');
var join = Promise.join;

module.exports = function(app) {

  app.get('/', function(req, res) {
    res.render('index', {});
  });

}
