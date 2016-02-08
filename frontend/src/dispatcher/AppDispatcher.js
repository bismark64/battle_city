//import {Dispatcher} from 'flux';
import Quantum from 'quantum-flux';

export default Object.assign(new Quantum(), {
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