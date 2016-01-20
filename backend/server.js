'use strict';

var express = require('express');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');

var DB = require('./config/db');
var apiRouter = require('./routes/api');

var app = express();
DB.connect();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static('../frontend/build'));

app.use('/api/v1', apiRouter);

app.get('/', function(req, res){
  res.sendfile('../frontend/build/index.html'); 
});

app.listen(3000);