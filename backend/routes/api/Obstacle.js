'use strict';

var express = require('express');
var router = express.Router();

var Obstacle = require('../../models/Obstacle');
var Level = require('../../models/Level');

var pushObstacleToLevel = function(obstacle, callback){
  Level.findOne({_id: obstacle.level}, function(error, level){
    level.obstacles.push(obstacle);
    level.save(callback);
  });
};

// Obstacles
router.route('/obstacles')
.get(function(req, res){
  Obstacle
  .find({})
  .populate('level')
  .exec(function(error, levels){
    res.json(levels);
  });
})
.post(function(req, res){
  var obstacle = new Obstacle(req.body);

  obstacle.save(function(error){
    if(error) res.sendStatus(500, {message: error});

    pushObstacleToLevel(obstacle, function(error) {
      if(error) res.sendStatus(500, {message: error});
      res.sendStatus(200);
    });
  });

});

router.route('/obstacles/:id')
.get(function(req, res){
  Obstacle
  .findOne({_id: req.params.id})
  .populate('level')
  .exec(function(error, level){
    res.json(level);
  });
})
.delete(function(req, res){
  Obstacle.remove({_id: req.params.id}, function(error){
    if(error) res.sendStatus(500, {message: error});
    res.sendStatus(200);
  });
});

module.exports = router;