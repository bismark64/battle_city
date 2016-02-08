import _ from 'lodash';
import TankDynamics from './TankDynamics';
import Collisionable from './Collisionable';

const SCORE_POINTS = {
  regular: 100,
  quick: 200,
  big: 400
};

let tanks = [];
let tankQueue = [];

const findTank = (id) => {
  return _.find(tanks, tank => tank.id == id);
};

const removeTank = (id) => {
  _.remove(tanks, tank => tank.id == id);
}

export default class Tank extends Collisionable {
  constructor(options={}){
    super({
      size: options.tankData.size, 
      speed: 12.5
    });

    this.game = options.game;
    this.path = null;
    this.stepSize = 12.5;
    this.id = options.tankData._id;
    this.kind = options.tankData.kind;
    this.orientation = options.tankData.orientation;
    this.type = options.tankData.type;
    this.x = options.tankData.x;
    this.y = options.tankData.y;

    this.dynamics = new TankDynamics(
      this, 
      this.game.getMapMatrix().matrix, 
      this.game.getMapMatrix().squareSize
    );
  }

  static setTankQueue(tanks){
    tankQueue = tanks;
  }

  static reset(){
    tanks = [];
    tankQueue = [];
  }

  // Getters
  static getTanks(){
    return tanks;
  }

  static getTankQueue(){
    return tankQueue;
  }

  // Tank Movement
  static move(tankId){
    const tank = findTank(tankId);
    tank.move();
  }

  // Destroy Tank
  static destroy(id){
    const tank = findTank(id);
    tank.destroy();
    removeTank(id)
  }

  // Instance
  _calculateScore(){
    return SCORE_POINTS[this.kind];
  }

  _getObstacles(){
    const filteredTanks = _.without(tanks, this);
    const player = [this.game.getPlayerState()];

    return _.flatten([
      filteredTanks,
      player
    ]);
  }

  save(){
    this.path = this.dynamics.getPath();
    tanks.push(this);
  }

  move(){
    if (this.path.length > 0) { // If path move tank to next tile
      const nextStep = this.path.shift();
      const obstacles = this._getObstacles();

      const nextX = nextStep.x * this.stepSize;
      const nextY = nextStep.y * this.stepSize;
      const noCollisionX = _.isEmpty(this.collision(obstacles, nextX, this.y));
      const noCollisionY = _.isEmpty(this.collision(obstacles, this.x, nextY));

      if (noCollisionX && noCollisionY) {
        this.x = nextX;
        this.y = nextY;
        this.orientation = nextStep.orientation;
      }else{
        this.path.unshift(nextStep); //re-add step to path
      }
    }else{ // If no path, generate a new path
      this.path = this.dynamics.getPath();
    }
  }

  destroy(){
    this.game.updateScore(this._calculateScore());
  }

}