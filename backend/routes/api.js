'use strict';

var express = require('express');
var router = express.Router();

var LevelApi = require('./api/Level');
var ObstacleApi = require('./api/Obstacle');
var TankApi = require('./api/Tank');

router.use(LevelApi);
router.use(ObstacleApi);
router.use(TankApi);

module.exports = router;
