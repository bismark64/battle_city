'use strict';

var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var ObstacleSchema = new Schema({
  type: {
    type: String,
    required: true
  },
  x: {
    type: Number,
    require: true
  },
  y: {
    type: Number,
    require: true
  },
  orientation: {
    type: String,
    required: true,
    default: 'horizontal'
  },
  level: {
    type: Schema.Types.ObjectId,
    ref: 'Level',
    require: true
  }
});

module.exports = mongoose.model('Obstacle', ObstacleSchema);
