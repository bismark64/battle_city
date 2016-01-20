'use strict';

var mongoose = require('mongoose');
var dbUrl    = require('./env/development').db;  

exports.connect = function(){
  mongoose.connect(dbUrl);
};