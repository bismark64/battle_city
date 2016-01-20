'use strict';

var express = require('express');
var router = express.Router();

var Level = require('../../models/Level');
var Tank = require('../../models/Tank');

// Levels
router.route('/levels')
.get(function(req, res){
  Level
  .find({})
  .populate('obstacles')
  .populate('tanks')
  .exec(function(error, levels){
    res.json(levels);
  });
})
.post(function(req, res){
  var level = new Level(req.body);

  level.save(function(error){
    if(error) res.sendStatus(500, {message: error});

    res.sendStatus(200);
  });
});

router.route('/levels/:id')
.get(function(req, res){
  Level
  .findOne({level: req.params.id})
  .populate('obstacles')
  .populate('tanks')
  .exec(function(error, level){
    res.json(level);
  });
});

module.exports = router;