import _ from 'lodash';
import PF from 'pathfinding';

const STOP_POINTS = [
  {x: 300, y: 500}, 
  {x: 100, y: 600}, 
  {x: 500, y:600}
];

const pathFinder = new PF.AStarFinder();

export default class TankDynamics {
  constructor(tank, matrix, squareSize){
    this.tank = tank;
    this.matrix = matrix;
    this.squareSize = squareSize;
  }

  _findPath(){
    const endPoint = _.sample(STOP_POINTS);

    const startX = Math.round(this.tank.x/this.squareSize);
    const startY = Math.round(this.tank.y/this.squareSize);
    const endX = Math.round(endPoint.x/this.squareSize);
    const endY = Math.round(endPoint.y/this.squareSize);

    const grid = new PF.Grid(this.matrix);

    return pathFinder.findPath(startX, startY, endX, endY, grid);
  }

  _generateMiddleTiles(newTile, orientation, xDiff, yDiff){
    let tiles = [];
    // Generate 'missing' tiles
    for (let i = 1; i <= 3; i++) {
      if(xDiff != 0){
        const x = xDiff > 0 ? newTile.x + i : newTile.x - i;
        tiles.push({x: x, y: newTile.y, orientation: orientation}) ;
      } 
      if(yDiff != 0) {
        const y = yDiff > 0 ? newTile.y + i : newTile.y - i;
        tiles.push({x: newTile.x, y: y, orientation: orientation}) ;
      }
    };

    return tiles;
  }

  getPath(){
    const path = this._findPath();
    const pathLength = path.length - 1;
    let transformedPath = [];

    _.each(path, (tile, index) => {
      // Transform 50px to 12.5px matrix
      const newTile = {x: tile[0]*4, y: tile[1]*4}; 
      let orientation = 'down';

      if (index < pathLength) {
        const nextTile = {x: path[index+1][0]*4, y: path[index+1][1]*4 };
        const xDiff = nextTile.x - newTile.x;
        const yDiff = nextTile.y - newTile.y;

        if(xDiff != 0){
          orientation = xDiff > 0 ? 'right' : 'left';
        }
        if(yDiff != 0) {
          orientation = yDiff > 0 ? 'down' : 'up';
        }

        //Add Transformed Tile
        transformedPath.push( _.merge(newTile, {orientation: orientation}) );

        // Generate and add middle tiles
        const middleTiles = this._generateMiddleTiles(newTile, orientation, xDiff, yDiff);
        transformedPath = transformedPath.concat(middleTiles);
      }else{
        // Last tile in path
        //Add Transformed Tile
        transformedPath.push( _.merge(newTile, {orientation: orientation}) );
      }

    });

    return transformedPath;
  }

}