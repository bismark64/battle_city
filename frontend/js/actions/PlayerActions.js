import PlayerConstants from '../constants/PlayerConstants';
import AppDispatcher from '../dispatcher/AppDispatcher';

export default {
  makeMove(key) {
    AppDispatcher.handleViewAction({
      actionType: PlayerConstants.MAKE_MOVE,
      key,
    });
  },
  shoot(key) {
    AppDispatcher.handleViewAction({
      actionType: PlayerConstants.SHOOT,
      key
    });
  },
  rematch() {
    AppDispatcher.handleViewAction({
      actionType: PlayerConstants.REMATCH
    });
  },
  gameOver(options) {
    AppDispatcher.handleViewAction({
      actionType: PlayerConstants.GAME_OVER,
      options
    });
  }
};