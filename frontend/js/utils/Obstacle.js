import _ from 'lodash';

import BrickConstructor from './BrickConstructor';
import Player from './Player';

export default class Obstacle {
  constructor(options={}){
    this.obstacles = {
      bricks: [],
      metals: []
    };
    this.obstacleBricks = {
      regular: [],
      metal: []
    };
  }

  save(obstacles) {
    // Store Obstacles
    this.obstacles = obstacles;
    // Store Bricks from Obstacles
    this.saveBricks(obstacles);    
    return true;
  }

  saveBricks(obstacles){
    let regularBricks = [{x: 300, y:600, size: 50}]; // Add Eagle as Obstacle
    let metalBricks = [];

    _.forEach(obstacles.bricks, (obstacle, index) => {
      obstacle.bricks = this.createBricks(obstacle, index);
      regularBricks.push(obstacle.bricks);
    });

    _.forEach(obstacles.metals, (obstacle, index) => {
      obstacle.bricks = this.createBricks(obstacle, index);
      metalBricks.push(obstacle.bricks);
    });

    // Store Bricks
    this.obstacleBricks.regular = _.flatten(regularBricks);
    this.obstacleBricks.metal = _.flatten(metalBricks);
  }

  createBricks(obstacle, index){
    return new BrickConstructor(obstacle, index).buildBricks();
  }

  removeBricks(bricks){
    _.forEach(bricks, brick => {
      // Remove from Bricks collection for collision detection
      _.remove(this.obstacleBricks.regular, b => b.x == brick.x && b.y == brick.y && b.size == brick.size);
      // Remove from Obstacles collection for re-rendering
      _.forEach(this.obstacles.bricks, oBricks => {
        _.remove(oBricks.bricks, b => b.x == brick.x && b.y == brick.y && b.size == brick.size);
      });
    });
  }

  // Getters
  get(){
    return this.obstacles;
  }

  getBricks(){
    return this.obstacleBricks.regular.concat(this.obstacleBricks.metal);
  }
}