import _ from 'lodash';

import StoreActions from '../actions/StoreActions';

const SCORE_POINTS = {
  regular: 100,
  quick: 200,
  big: 400
};

export default class Tank {
  constructor(options={}){
    this.dataStore = options.dataStore;
    this.stopPoints = [{x: 300, y: 500}, {x: 100, y: 600}, {x: 500, y:600}];
    this.tanks = [];
    this.stepSize = 50;
  }

  _find(id){
    return _.find(this.tanks, tank => tank.id == id);
  }

  _getPath(tank){
    return _.drop(this.dataStore.getMapPath(tank, _.sample(this.stopPoints)));
  }

  _calculatePoints(id){
    const tank = this._find(id);
    return SCORE_POINTS[tank.kind];
  }

  create(tanks){
    _.each(tanks, tankData => {
      let id = this.tanks.length + 1;
      let tank = _.merge(tankData, {id: id, size: 50, type: 'tank', orientation: 'down', path: this._getPath(tankData)});
      this.tanks.push(tank);
    });
  }

  // Tank Movement
  move(tankId){
    const tank = this._find(tankId);

    if (tank.path.length > 0) { // If path move tank to next tile
      const nextStep = tank.path.shift();

      tank.x = nextStep[0]*this.stepSize;
      tank.y = nextStep[1]*this.stepSize;
    }else{ // If no path, generate a new path
      tank.path = this._getPath(tank);
    }
  }

  // Destroy Tank
  destroy(id){
    this.dataStore.updateScore(this._calculatePoints(id));
    _.remove(this.tanks, tank => tank.id == id);
    if(_.isEmpty(this.tanks)) alert('You win!');
  }

  // Getters
  get(){
    return this.tanks;
  }
}