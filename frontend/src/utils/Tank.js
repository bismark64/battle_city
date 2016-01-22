import _ from 'lodash';
import PF from 'pathfinding';

const STOP_POINTS = [
  {x: 300, y: 500}, 
  {x: 100, y: 600}, 
  {x: 500, y:600}
];

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

const pathFinder = new PF.AStarFinder();

export default class Tank {
  constructor(options={}){
    this.game = options.game;
    this.path = null;
    this.stepSize = 50;
    this.id = options.tankData._id;
    this.kind = options.tankData.kind;
    this.orientation = options.tankData.orientation;
    this.size = options.tankData.size;
    this.type = options.tankData.type;
    this.x = options.tankData.x;
    this.y = options.tankData.y;
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
  _getPath(){
    const matrix = this.game.getMapMatrix().matrix;
    const matrixSquareSize = this.game.getMapMatrix().squareSize;

    const endPoint = _.sample(STOP_POINTS);

    const startX = Math.round(this.x/matrixSquareSize);
    const startY = Math.round(this.y/matrixSquareSize);
    const endX = Math.round(endPoint.x/matrixSquareSize);
    const endY = Math.round(endPoint.y/matrixSquareSize);

    const grid = new PF.Grid(matrix);

    return _.drop(pathFinder.findPath(startX, startY, endX, endY, grid));
  }

  _calculateScore(){
    return SCORE_POINTS[this.kind];
  }

  save(){
    this.path = this._getPath();
    tanks.push(this);
  }

  move(){
    if (this.path.length > 0) { // If path move tank to next tile
      const nextStep = this.path.shift();

      this.x = nextStep[0]*this.stepSize;
      this.y = nextStep[1]*this.stepSize;
    }else{ // If no path, generate a new path
      this.path = this._getPath();
    }
  }

  destroy(){
    this.game.updateScore(this._calculateScore());
  }

}