import {Dispatcher} from 'flux';

export default Object.assign(new Dispatcher(), {
  handleStoreAction(action){
    this.dispatch({
      source: 'STORE_ACTION',
      action: action
    });
  },
  // @param {object} action The data coming from the view.
  handleViewAction(action) {
    this.dispatch({
      source: 'VIEW_ACTION',
      action: action
    });
  }
});