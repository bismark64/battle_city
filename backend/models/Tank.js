'use strict';

var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var TankSchema = new Schema({
  type: {
    type: String,
    required: true,
    default: 'tank'
  },
  kind: {
    type: String,
    required: true,
    default: 'regular'
  },
  x: {
    type: Number,
    require: true
  },
  y: {
    type: Number,
    require: true
  },
  size: {
    type: Number,
    require: true,
    default: 50
  },
  orientation: {
    type: String,
    required: true,
    default: 'down'
  },
  level: {
    type: Schema.Types.ObjectId,
    ref: 'Level',
    require: true
  }

});

module.exports = mongoose.model('Tank', TankSchema);
