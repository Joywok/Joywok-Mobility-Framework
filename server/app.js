var express = require('express');
//var connect = require('connect');
var app = module.exports.app = exports.app = express();
var redis = require('redis');
var db = redis.createClient();

app.get('/', function(req, res){
  res.send('hello world');
});


app.use(function(err, req, res, next){
  //console.error(err.stack);
  res.send(500, 'Something broke!');
});