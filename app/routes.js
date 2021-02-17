// app/routes.js
'use strict'

module.exports = function(app) {
  app.get('/', function(req, res) {
    const time = new Date()
    res.render('index', { time: time.toUTCString() })
  })
}
