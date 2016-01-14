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
  addObstaclePoints(points) {
    AppDispatcher.handleViewAction({
      actionType: GameConstants.OBSTACLE_POINTS,
      points,
    });
  }
};