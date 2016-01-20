'use strict';

var express = require('express');
var router = express.Router();

var Tank = require('../../models/Tank');
var Level = require('../../models/Level');

var pushTankToLevel = function(tank, callback){
  Level.findOne({_id: tank.level}, function(error, level){
    level.tanks.push(tank);
    level.save(callback);
  });
};

// Tanks
router.route('/tanks')
.get(function(req, res){
  Tank
  .find({})
  .exec(function(error, levels){
    res.json(levels);
  });
})
.post(function(req, res){
  var tank = new Tank(req.body);

  tank.save(function(error){
    if(error) res.sendStatus(500, {message: error});

    pushTankToLevel(tank, function(error) {
      if(error) res.sendStatus(500, {message: error});
      res.sendStatus(200);
    });
  });

});

router.route('/tanks/:id')
.get(function(req, res){
  Tank
  .findOne({_id: req.params.id})
  .exec(function(error, level){
    res.json(level);
  });
})
.put(function(req, res){
  Tank.update({_id: req.params.id}, req.body, function(error){
    if(error) res.sendStatus(500, {message: error});
    res.sendStatus(200);
  });
})
.delete(function(req, res){
  Tank.remove({_id: req.params.id}, function(error){
    if(error) res.sendStatus(500, {message: error});
    res.sendStatus(200);
  });
});

module.exports = router;