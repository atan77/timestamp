'use strict';

//call package to parse time strings
var moment = require('moment');

//refers back to the express package called in server.js
module.exports = function(app){

//gets the string after the / and gives it a parameter name of query
//dataQuery given the value of the query parameter
//initialise unixTime and naturalTime to reduce if/else statements
//use moment to generate currentNatural and currentUnix times for reference
app.get('/:query', function (req,res) {
  var dateQuery = req.params.query;
  var unixTime = null;
  var naturalTime = null;
  var currentNatural = moment().format('DD-MM-YYYY');
  var currentUnix = moment(currentNatural).format('X');

//for a valid unix time, dateQuery must be greater than 0, if true, then unixTime is set to dateQuery and natural time is taken as unixTime converted to DD-MM-YYYY format for natural time
  if (dateQuery >= 0) {
    unixTime = dateQuery;
    naturalTime = moment.unix(unixTime).format('DD-MM-YYYY');
  }
//if string passed in is not a number and is a valid string according to moment, then convert to unixTime using format 'X' and standardise format for natural Time
  if (isNaN(dateQuery) && moment(dateQuery).isValid) {
    unixTime= moment(dateQuery).format('X');
    naturalTime= moment.unix(unixTime).format('DD-MM-YYYY');
  } 

//create variable to return date
var dateReturn={'current unix time': currentUnix, 'current natural time': currentNatural, 'unix time': unixTime, 'natural time':naturalTime};

//as response, send a JSON string version of the return date variable
  res.send(JSON.stringify(dateReturn));
  

});

};