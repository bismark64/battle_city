import Immutable, {List, Range} from 'immutable';
import _ from 'lodash';

import GameStore from '../stores/GameStore';

const ORIENTATION_MAPPER = {
  left: ['x', '-'],
  right: ['x', '+'],
  up: ['y', '-'],
  down: ['y', '+']
};

const OPERATORS = {
  '+': function(a, b){ return a + b },
  '-': function(a, b){ return a - b }
};

export default class GameDataStore{
  constructor(options={}){
    this.obstacles = {};
    this.obstaclePointsMap = [];
    this.bullets = [];
    this.explosions = [];

    this.bulletSpeed = 2;
    this.bulletSize = 5;

    let mapMax = 650 - this.bulletSize - 20;
    this.mapSize = options.mapSize || Range(0, mapMax);
  }

  storeObstacles(obstacles) {
    this.obstacles = obstacles;
    return true;
  };

  storeObstaclePoints(obstaclesPoints){
    this.obstaclePointsMap.push(obstaclesPoints);
    return true;
  };

  // Fix Mispositioning and store bullet
  createBullet(bullet){
    let x,y;
    let index = this.bullets.length + 1;

    switch (bullet.orientation) {
      case 'up':
        x = bullet.x + 23;
        y = bullet.y - 5;
        break;
      case 'down':
        x = bullet.x + 22;
        y = bullet.y + 50; 
        break;
      case 'left':
        x = bullet.x - 5;
        y = bullet.y + 22;
        break;
      case 'right':
        x = bullet.x + 50;
        y = bullet.y + 23; 
        break;
    }

    this.bullets.push({id: index, x: x, y: y, orientation: bullet.orientation});
    return true;
  }

  moveBullet(bulletId){
    const bullet = _.find(this.bullets, (bullet) => bullet.id == bulletId);

    const axis = ORIENTATION_MAPPER[bullet.orientation][0];
    const operator = ORIENTATION_MAPPER[bullet.orientation][1];
    const value = OPERATORS[operator](bullet[axis], this.bulletSpeed);
    
    bullet[axis] = value;

    _.remove(this.bullets, bullet => bullet.id == bulletId); //Remove old bullet from collection

    if(this.bulletCollision(bullet)){
      this.createExplosion(bullet);
    }else{
      this.bullets.push(bullet); //Re-add modified object to collection
    }

    return true;
  }

  checkWithinCanvas(x,y){
    return x >= this.mapSize.first() && x <= this.mapSize.last() && y >= this.mapSize.first() && y <= this.mapSize.last();
  }

  bulletCollision(bullet){
    let _this = this;
    let c = false;

    if (!this.checkWithinCanvas(bullet.x, bullet.y)) { return true };

    _.forEach(this.getObstaclePoints(), (obstacleCoordinates) => {
      let rect1 = {x: bullet.x, y: bullet.y, width: _this.bulletSize, height: _this.bulletSize};
      let rect2 = {x: obstacleCoordinates[0], y: obstacleCoordinates[1], width: obstacleCoordinates[2], height: obstacleCoordinates[2] };

      let collided = rect1.x < rect2.x + rect2.width && rect1.x + rect1.width > rect2.x && rect1.y < rect2.y + rect2.height && rect1.height + rect1.y > rect2.y;

      if(collided){
        c = true;
        return false;
      }
    });

    return c;
  }

  //Explosion
  createExplosion(bullet){
    let index = this.explosions.length + 1;
    this.explosions.push({id: index, x: bullet.x, y: bullet.y});
  }

  removeExplosion(explosionId){
    _.remove(this.explosions, explosion => explosion.id == explosionId);
    return true;
  }

  // Getters
  getObstacles(){
    return this.obstacles;
  } 
  getObstaclePoints(){
    return _.flatten(this.obstaclePointsMap);
  }
  getBullets(){
    return this.bullets;
  }
  getExplosions(){
    return this.explosions;
  }
}