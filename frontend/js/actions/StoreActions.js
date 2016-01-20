import StoreConstants from '../constants/StoreConstants';
import AppDispatcher from '../dispatcher/AppDispatcher';

export default {
  loadedMap(mapData){
    AppDispatcher.handleStoreAction({
      actionType: StoreConstants.LOADED_MAP,
      mapData,
    });
  }
}