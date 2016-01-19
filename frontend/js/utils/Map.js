import _ from 'lodash';
import PF from 'pathfinding';
import BrickConstructor from './BrickConstructor';

export default class Map {
  constructor(options={}){
    this.dataStore =  options.dataStore;
    this.size = 650;
    this.gridSquareSize = 50;
    this.obstacles = [];
    this.graphData = {};
  }

  _findObstacleInSquare(x,y, squareSize){
    return _.find(this.obstacles, obs => {
      let q = obs.x == x && obs.y == y; // Regular Match
      if (!q && (obs.x%this.gridSquareSize != 0 || obs.y%this.gridSquareSize != 0)) {
        let a = (obs.x == (x + this.gridSquareSize/2) && obs.y == y);
        let b = (obs.x == x && obs.y == (y + this.gridSquareSize/2) );
        let c = (obs.x == (x + this.gridSquareSize/2) && obs.y == (y + this.gridSquareSize/2) );
        return a || b || c; // Match if obstacle occupies multiple squares
      }
      return q;
    });
  }

  _generateMatrix(options={}){
    let matrix = [];
    const squaresPerRow = Math.round(options.gridSize/options.squareSize);

    for (let i = 0; i < squaresPerRow; i++) { // y axis
      matrix[i] = [];
      for (let j = 0; j < squaresPerRow; j++) { // x axis
        let y = i*options.squareSize;
        let x = j*options.squareSize;

        let squareOccupied = this._findObstacleInSquare(x,y, options.squareSize) != undefined;
        matrix[i][j] = squareOccupied ? 1 : 0;
      }
    };

    return matrix;
  }

  _createBricks(obstacle){
    return new BrickConstructor(obstacle).buildBricks();
  }

  _saveGraph(){
    const matrix = this._generateMatrix({gridSize: this.size, squareSize: this.gridSquareSize});
    const finder = new PF.AStarFinder();

    this.graphData = {
      finder: finder,
      matrix: matrix
    };
  }

  // Seters
  saveObstacles(obstacles){
    let bricks = [];
    _.forEach(obstacles, (obstacle) => {
      bricks.push(this._createBricks(obstacle));
    });
    this.obstacles = _.flatten(bricks); // Save Obstacles

    // Generate Grid Map
    this._saveGraph();
    return true;
  }

  removeObstacles(obstacles){
    _.forEach(obstacles, obstacle => {
      // If Tank is impacted remove it
      if (obstacle.type == 'tank') {
        this.dataStore.removeTank(obstacle.id);
      }
      // If Eagle is impacted stop the game
      if (obstacle.type == 'eagle') {
        this.dataStore.gameOver();
      }
      // If destroyable obstacle is impacted remove it
      if (obstacle.type == 'brick') {
        _.remove(this.obstacles, b => b.x == obstacle.x && b.y == obstacle.y && b.size == obstacle.size);
      }
    });
  }

  // Getters
  getObstacles(){
    return this.obstacles;
  }

  getGridGraph(){
    return this.graphData;
  }

  getPath(from, to){
    const startX = Math.round(from.x/this.gridSquareSize);
    const startY = Math.round(from.y/this.gridSquareSize);
    const endX = Math.round(to.x/this.gridSquareSize);
    const endY = Math.round(to.y/this.gridSquareSize);

    const grid = new PF.Grid(this.graphData.matrix);

    return this.graphData.finder.findPath(startX, startY, endX, endY, grid);
  }

}