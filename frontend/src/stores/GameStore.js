import EventEmitter from 'eventemitter3';
import {List, Range} from 'immutable';
import _ from 'lodash';

import AppDispatcher from '../dispatcher/AppDispatcher';
import GameConstants from '../constants/GameConstants';
import StoreConstants from '../constants/StoreConstants';

import Game from '../utils/Game';
const game = new Game();

const CHANGE_EVENT = 'change';

const GameStore = Object.assign({}, EventEmitter.prototype, {
  initialState() {
    return game.state();
  },

  getState(){
    return game.state();
  },

  addChangeListener(callback) {
    this.on('change', callback);
  },

  removeChangeListener(callback) {
    this.removeListener('change', callback);
  }

});

AppDispatcher.register(GameStore, payload => {
  const action = payload.action;
  let emitEvent = false;

  switch (action.actionType) {
    case GameConstants.START:
      emitEvent = game.startGame(action.map);
      break;

    case StoreConstants.LOADED_MAP:
      emitEvent = game.mapLoaded(action.mapData);
      break;

    case GameConstants.TOGGLE_PAUSE:
      emitEvent = game.togglePauseGame();
      break;

    case GameConstants.GAME_OVER:
      emitEvent = game.gameOver(action.timestamp);
      break;

    case GameConstants.CREATE_TANK:
      emitEvent = game.addNewTank();
      break;

    case GameConstants.INPUT_KEY_DOWN:
      emitEvent = game.inputKeyDown(action.key);
      break;

    case GameConstants.INPUT_KEY_UP:
      emitEvent = game.inputKeyUp(action.key);
      break;

    case GameConstants.SHOOT:
      emitEvent = game.createBullet(action.initialData);
      break;

    case GameConstants.BULLET_UPDATE:
      emitEvent = game.moveBullet(action.bulletId);
      break;

    case GameConstants.EXPLOSION:
      emitEvent = game.removeExplosion(action.explosion);
      break;

    case GameConstants.TANK_MOVE:
      emitEvent = game.moveTank(action.tankId);
      break;

    default:
      return true;
  }

  if (emitEvent) GameStore.emit(CHANGE_EVENT);
  return true;
});

export default GameStore;