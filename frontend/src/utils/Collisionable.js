import { Range } from 'immutable';
import _ from 'lodash';

const withinMap = (x,y, map) => {
  return x >= map.first() && x <= map.last() && y >= map.first() && y <= map.last();
};

export default class Collisionable {
  constructor(params={}){
    this.size = params.size;
    this.speed = params.speed;
    this.mapSize = params.mapSize || Range(0, (650-this.size+this.speed));
  }

  collision(obstacles, x=this.x, y=this.y){
    let collisionWith = [];

    if (!withinMap(x, y, this.mapSize)) { return [null] }; // Field Edges

    _.forEach(obstacles, (obstacle) => {
      let rect1 = {x: x, y: y, width: this.size, height: this.size};
      let rect2 = {x: obstacle.x, y: obstacle.y, width: obstacle.size, height: obstacle.size };

      let collided = rect1.x < rect2.x + rect2.width && rect1.x + rect1.width > rect2.x && rect1.y < rect2.y + rect2.height && rect1.height + rect1.y > rect2.y;

      if(collided) collisionWith.push(obstacle);
    });

    return collisionWith;
  }
}