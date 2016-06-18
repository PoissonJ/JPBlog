#!/usr/bin/env node

var debug = require('debug')('passport-mongo');
var app = require('./app');


app.set('port', 80);


var server = app.listen(app.get('port'), function() {
  debug('Express server listening on port ' + server.address().port);
  console.log("Listening on port " + server.address().port);
});
