import GameConstants from '../constants/GameConstants';
import AppDispatcher from '../dispatcher/AppDispatcher';
import AsyncLoader from '../utils/AsyncLoader';

export default {
  loadMap(mapUrl){
    let mapData = AsyncLoader.loadMap(mapUrl);

    AppDispatcher.handleViewAction({
      actionType: GameConstants.LOAD_MAP,
      mapData,
    });
  },
  start() {
    AppDispatcher.handleViewAction({
      actionType: GameConstants.START
    });
  },
  togglePause(key) {
    AppDispatcher.handleViewAction({
      actionType: GameConstants.TOGGLE_PAUSE,
      key,
    });
  },
  gameOver(data) {
    AppDispatcher.handleViewAction({
      actionType: GameConstants.GAME_OVER,
      data,
    });
  },
  playerMove(key) {
    AppDispatcher.handleViewAction({
      actionType: GameConstants.PLAYER_MOVE,
      key,
    });
  },
  shoot(initialData){
    AppDispatcher.handleViewAction({
      actionType: GameConstants.SHOOT,
      initialData,
    });
  },
  moveBullet(bulletId){
    AppDispatcher.handleViewAction({
      actionType: GameConstants.BULLET_UPDATE,
      bulletId,
    });
  },
  removeExplosion(explosion){
    AppDispatcher.handleViewAction({
      actionType: GameConstants.EXPLOSION,
      explosion,
    });
  }
};