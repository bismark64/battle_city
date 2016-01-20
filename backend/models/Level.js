'use strict';

var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var LevelSchema = new Schema({
  name: {
    type: String,
    required: true,
    default: 'Level'
  },
  level: {
    type: Number,
    required: true
  },
  obstacles: [{
    type: Schema.Types.ObjectId,
    ref: 'Obstacle',
    required: true
  }],
  tanks: [{
    type: Schema.Types.ObjectId,
    ref: 'Tank',
    required: true
  }]

});

module.exports = mongoose.model('Level', LevelSchema);

