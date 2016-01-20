import GameConstants from '../constants/GameConstants';
import AppDispatcher from '../dispatcher/AppDispatcher';
import AsyncLoader from '../utils/AsyncLoader';

export default {
  start(level) {
    let map = AsyncLoader.loadMap(level);

    AppDispatcher.handleViewAction({
      actionType: GameConstants.START,
      map
    });
  },
  togglePause() {
    AppDispatcher.handleViewAction({
      actionType: GameConstants.TOGGLE_PAUSE
    });
  },
  gameOver(data) {
    AppDispatcher.handleViewAction({
      actionType: GameConstants.GAME_OVER,
      data,
    });
  },
  win(){
    AppDispatcher.handleViewAction({
      actionType: GameConstants.WIN
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
  },
  moveTank(tankId){
    AppDispatcher.handleViewAction({
      actionType: GameConstants.TANK_MOVE,
      tankId,
    });
  }

};