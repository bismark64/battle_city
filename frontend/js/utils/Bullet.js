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
    this.bulletSize = 5;

    this.explosion = options.explosion;
    this.obstacles = options.obstacles;

    let mapMax = 650 - this.bulletSize - 20;
    this.mapSize = options.mapSize || Range(0, mapMax);
  }

  create(bullet){
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

  move(bulletId){
    const bullet = _.find(this.bullets, (bullet) => bullet.id == bulletId);

    _.remove(this.bullets, bullet => bullet.id == bulletId); //Remove old bullet from collection

    const axis = ORIENTATION_MAPPER[bullet.orientation][0];
    const operator = ORIENTATION_MAPPER[bullet.orientation][1];
    const value = OPERATORS[operator](bullet[axis], this.bulletSpeed);
    
    bullet[axis] = value;

    const collided = this.collision(bullet);

    if(collided[0]){
      this.explosion.create(bullet);
      console.log(collided[1]);
      //if(collided[1] != null) this.removeObstacles([collided[1]]);
    }else{
      this.bullets.push(bullet); //Re-add modified object to collection
    }

    return true;
  }

  withinField(x,y){
    return x >= this.mapSize.first() && x <= this.mapSize.last() && y >= this.mapSize.first() && y <= this.mapSize.last();
  }

  collision(bullet){
    let obstacles = this.obstacles.getBricks();
    let collisionWith = [false, null];

    if (!this.withinField(bullet.x, bullet.y)) { return [true, null] };

    _.forEach(obstacles, (obstacle) => {
      let rect1 = {x: bullet.x, y: bullet.y, width: this.bulletSize, height: this.bulletSize};
      let rect2 = {x: obstacle.x, y: obstacle.y, width: obstacle.size, height: obstacle.size };

      let collided = rect1.x < rect2.x + rect2.width && rect1.x + rect1.width > rect2.x && rect1.y < rect2.y + rect2.height && rect1.height + rect1.y > rect2.y;

      if(collided){
        collisionWith = [true, obstacle];
        return false;
      }
    });

    return collisionWith;
  }

  // Getters
  get(){
    return this.bullets;
  }

}