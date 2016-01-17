import EventEmitter from 'eventemitter3';
import {List, Range} from 'immutable';
import _ from 'lodash';

import AppDispatcher from '../dispatcher/AppDispatcher';
import GameConstants from '../constants/GameConstants';

import GameDataStore from '../utils/GameDataStore';

const CHANGE_EVENT = 'change';
const dataStore = new GameDataStore();


const GameStore = Object.assign({}, EventEmitter.prototype, {
  initialState() {
    return dataStore.initialState();
  },

  getState(){
    return {
      playing: dataStore.isPlaying(),
      score: dataStore.getScore(),
      lives: dataStore.getLives(),
      player: dataStore.getPlayerState(),
      obstacles: dataStore.getObstacles(),
      bullets: dataStore.getBullets(),
      explosions: dataStore.getExplosions()
    };
  },

  addChangeListener(callback) {
    this.on('change', callback);
  },

  removeChangeListener(callback) {
    this.removeListener('change', callback);
  }

});

AppDispatcher.register(payload => {
  const action = payload.action;
  let emitEvent = true;

  switch (action.actionType) {
    case GameConstants.LOAD_MAP:
      emitEvent = dataStore.storeObstacles(action.mapData);
      break;

    case GameConstants.START:
      emitEvent = dataStore.startGame();
      break;

    case GameConstants.TOGGLE_PAUSE:
      emitEvent = dataStore.togglePauseGame();
      break;

    case GameConstants.GAME_OVER:
      emitEvent = dataStore.gameOver(action.timestamp);
      break;

    case GameConstants.PLAYER_MOVE:
      emitEvent = dataStore.playerMove(action.key);
      break;

    case GameConstants.SHOOT:
      emitEvent = dataStore.createBullet(action.initialData);
      break;

    case GameConstants.BULLET_UPDATE:
      emitEvent = dataStore.moveBullet(action.bulletId);
      break;

    case GameConstants.EXPLOSION:
      emitEvent = dataStore.removeExplosion(action.explosion);
      break;

    default:
      return true;
  }

  if (emitEvent) GameStore.emit(CHANGE_EVENT);
  return true;
});

export default GameStore;