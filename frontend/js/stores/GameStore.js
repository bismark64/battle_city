import EventEmitter from 'eventemitter3';
import {List, Range} from 'immutable';
import _ from 'lodash';

import AppDispatcher from '../dispatcher/AppDispatcher';
import GameConstants from '../constants/GameConstants';
import GameObstacleRects from '../utils/GameObstacleRects';

const CHANGE_EVENT = 'change';

let _obstacles = {};
let _obstaclePointsMap = [];

const storeObstacles = (obstacles) => {
  _obstacles = obstacles;
  return true;
};

const storeObstaclePoints = (obstaclesPoints) =>{
  _obstaclePointsMap.push(obstaclesPoints);
  return true;
};

const GameStore = Object.assign({}, EventEmitter.prototype, {
  getState(){
    return {
      obs: _obstacles,
      obstaclePointsMap: _.flatten(_obstaclePointsMap)
    };
  },

  getGameCollisionObstacles(){
    return GameObstacleRects.getRects();
  },

  addChangeListener(callback) {
    this.on('change', callback);
  },

  removeChangeListener(callback) {
    this.removeListener('change', callback);
  }

});

GameStore.dispatcherToken = AppDispatcher.register(payload => {
  const action = payload.action;
  let emitEvent = true;

  switch (action.actionType) {
    case GameConstants.LOAD_MAP:
      emitEvent = storeObstacles(action.mapData);
      break;

    case GameConstants.OBSTACLE_POINTS:
      emitEvent = storeObstaclePoints(action.points);
      break;

    default:
      return true;
  }

  if (emitEvent) GameStore.emit(CHANGE_EVENT);
  return true;
});

export default GameStore;