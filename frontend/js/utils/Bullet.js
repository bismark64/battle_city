import Immutable, {List, Range} from 'immutable';
import _ from 'lodash';

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

export default class Bullet {
  constructor(options={}){
    this.bullets = [];
    this.bulletSpeed = 2;
    this.bulletSize = 50;

    this.explosion = options.explosion;
    this.obstacles = options.obstacles;

    this.mapSize = options.mapSize || Range(0, (650-this.bulletSize));
  }

  create(bullet){
    let index = this.bullets.length + 1;
    this.bullets.push({id: index, x: bullet.x, y: bullet.y, orientation: bullet.orientation});
    return true;
  }

  move(bulletId){
    const bullet = _.find(this.bullets, (bullet) => bullet.id == bulletId);

    _.remove(this.bullets, bullet => bullet.id == bulletId); //Remove old bullet from collection

    const axis = ORIENTATION_MAPPER[bullet.orientation][0];
    const operator = ORIENTATION_MAPPER[bullet.orientation][1];
    const value = OPERATORS[operator](bullet[axis], this.bulletSpeed);
    
    bullet[axis] = value;

    const collisionWith = this.collision(bullet);

    if(_.isEmpty(collisionWith)){
      this.bullets.push(bullet); //Re-add modified object to collection
    }else{
      console.log(collisionWith);
      this.explosion.create(bullet);
      if(collisionWith[0] != null) this.obstacles.removeBricks(collisionWith);
    }

    return true;
  }

  withinField(x,y){
    return x >= this.mapSize.first() && x <= this.mapSize.last() && y >= this.mapSize.first() && y <= this.mapSize.last();
  }

  collision(bullet){
    let obstacles = this.obstacles.getBricks();
    let collisionWith = [];

    if (!this.withinField(bullet.x, bullet.y)) { return [null] }; // Field Edges

    _.forEach(obstacles, (obstacle) => {
      let rect1 = {x: bullet.x, y: bullet.y, width: this.bulletSize, height: this.bulletSize};
      let rect2 = {x: obstacle.x, y: obstacle.y, width: obstacle.size, height: obstacle.size };

      let collided = rect1.x < rect2.x + rect2.width && rect1.x + rect1.width > rect2.x && rect1.y < rect2.y + rect2.height && rect1.height + rect1.y > rect2.y;

      if(collided) collisionWith.push(obstacle);
    });

    return collisionWith;
  }

  // Getters
  get(){
    return this.bullets;
  }

}