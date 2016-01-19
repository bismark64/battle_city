import StoreConstants from '../constants/StoreConstants';
import AppDispatcher from '../dispatcher/AppDispatcher';

export default {
  storeTankPath(pathData){
    AppDispatcher.handleStoreAction({
      actionType: StoreConstants.STORE_TANK_PATH,
      pathData,
    });
  }
}