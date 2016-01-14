import PlayerConstants from '../constants/PlayerConstants';
import AppDispatcher from '../dispatcher/AppDispatcher';

export default {
  makeMove(keyCode) {
    AppDispatcher.handleViewAction({
      actionType: PlayerConstants.MAKE_MOVE,
      keyCode,
    });
  },
  shoot(promotion) {
    AppDispatcher.handleViewAction({
      actionType: PlayerConstants.SHOOT,
      promotion
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