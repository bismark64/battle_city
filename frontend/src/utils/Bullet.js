import {List} from 'immutable';
import _ from 'lodash';

import Collisionable from './Collisionable';

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

let bullets = [];

const findBullet = (id) => {
  return _.find(bullets, (bullet) => bullet.id == id);
}

const removeBullet = (id) => {
  _.remove(bullets, bullet => bullet.id == id);
}

export default class Bullet extends Collisionable {
  constructor(options={}){
    super({size: 50, speed: 20});
    this.id = bullets.length + 1;
    this.x = options.data.x;
    this.y = options.data.y;
    this.shooter = options.data.shooter;
    this.orientation = options.data.orientation;
    this.game = options.game;
  }

  static get(){
    return bullets;
  }

  static move(id){
    const bullet = findBullet(id);
    bullet.move();
  }

  // Instance
  _updatePosition(){
    const axis = ORIENTATION_MAPPER[this.orientation][0];
    const operator = ORIENTATION_MAPPER[this.orientation][1];
    const value = OPERATORS[operator](this[axis], this.speed);
    
    this[axis] = value;

    return this;
  }

  _getObstacles(){
    const tanks = this.shooter == 'player' ? this.game.getTanks() : [this.game.getPlayerState()];

    return _.flatten([
      this.game.getObstacles(),
      tanks
    ]);
  }

  save(){
    bullets.push(this);
  }

  move(){
    const movedBullet = this._updatePosition();
    const obstacles = this._getObstacles();
    const collisionWith = this.collision(obstacles, movedBullet.x, movedBullet.y);

    if (collisionWith.length > 0) {
      this.destroy();
      if(collisionWith[0] != null) this.game.removeObstacles(collisionWith); // Remove impacted obstacle
    };
  }

  destroy(){
    removeBullet(this.id);
    this.game.createExplosion(this); //Create Explosion
  }

}