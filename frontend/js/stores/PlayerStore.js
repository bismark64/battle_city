import EventEmitter from 'eventemitter3';
import {List, Range} from 'immutable';
import _ from 'lodash';

import AppDispatcher from '../dispatcher/AppDispatcher';
import PlayerConstants from '../constants/PlayerConstants';
import PlayerDynamics from '../utils/PlayerDynamics';
import GameStore from '../stores/GameStore';

const CHANGE_EVENT = 'change';
const MOVE_EVENT = 'new-move';

const pd = new PlayerDynamics();

const PlayerStore = Object.assign({}, EventEmitter.prototype, {
  getState(){
    return {
      x: pd.getPosition().first(),
      y: pd.getPosition().last(),
      orientation: pd.getOrientation()
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
    case PlayerConstants.MAKE_MOVE:
      AppDispatcher.waitFor([
        GameStore.dispatcherToken
      ]);

      emitEvent = pd.makeMove(action);
      break;

    case PlayerConstants.SHOOT:
      //_promotion = action.promotion;
      break;

    case PlayerConstants.GAME_OVER:
      //gameOver(action.options);
      break;

    case PlayerConstants.REMATCH:
      //setInitialState();
      break;

    default:
      return true;
  }

  if (emitEvent) PlayerStore.emit(CHANGE_EVENT);
  return true;
});

export default PlayerStore;