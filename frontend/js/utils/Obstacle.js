import _ from 'lodash';

import BrickConstructor from './BrickConstructor';
import Player from './Player';

export default class Obstacle {
  constructor(options={}){
    this.obstacles = {};
    this.obstacleBricks = {
      regular: [],
      metal: []
    };
    this.player = options.player || new Player();
  }

  save(obstacles) {
    let _this = this;
    let regularBricks = [{x: 300, y:600, size: 50}]; // Add Eagle as Obstacle
    let metalBricks = [];

    _.forEach(obstacles.bricks, (obstacle, index) => {
      obstacle.bricks = this.createBricks(obstacle);
      regularBricks.push(obstacle.bricks);
    });

    _.forEach(obstacles.metals, (obstacle, index) => {
      obstacle.bricks = this.createBricks(obstacle);
      metalBricks.push(obstacle.bricks);
    });

    // Store Bricks
    this.obstacleBricks.regular = _.flatten(regularBricks);
    this.obstacleBricks.metal = _.flatten(metalBricks);

    // Store Obstacles
    this.obstacles = obstacles;

    // Send Bricks to Player
    this.player.storeObstacles(this.getBricks());
    return true;
  }

  createBricks(obstacle){
    return new BrickConstructor(obstacle).buildBricks();
  }

  remove(obstacles){
    _.forEach(obstacles, obstacle => {
      _.remove(this.obstacles, obs => obs.id == obstacle.id);
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