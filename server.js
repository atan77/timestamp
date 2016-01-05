'use strict';

//call packages used
var express = require('express');
var app = express();

//as code has been set in modules, need to call these modules
var api = require('./app/api/timestampapi.js');
var routes = require('./app/routes/index.js');

//set port for server to listen on
var port = process.env.PORT || 8080;
//set path for app to call static files like index.html, process.cwd refers to current working directory
app.use('/', express.static(process.cwd() + '/public'));
//server status message
app.listen(port);
console.log('Server started! At http:localhost: ' + port);



routes(app);
api(app);
