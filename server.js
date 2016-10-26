'use strict'

var app = require('./app.js')

var port = process.env.PORT || 5000 // process.env.PORT lets the port be set by Heroku

// start server
app.listen(port, function() {
  console.info('Environment: ' + app.get('env'))
  console.info('Running on http://localhost:' + port)
})
