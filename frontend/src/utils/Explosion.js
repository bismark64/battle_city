import _ from 'lodash';

let explosions = [];

export default class Explosion {
  constructor(bullet){
    this.x = bullet.x;
    this.y = bullet.y;
    this.orientation = bullet.orientation;
    this.bulletSize = 50;
    this.bulletSpeed = 20;
    this.bulletOffset = 12.5;
    this.impactOffset = this.bulletSize - this.bulletSpeed;
  }

  static get(){
    return explosions;
  }

  save(bullet){
    let x = this.x;
    let y = this.y;
    const index = explosions.length + 1;

    if (this.orientation == 'left' || this.orientation == 'right') {
      y = y + this.bulletOffset;
      if (this.orientation == 'right') x = x + this.impactOffset;
    } else{
      x = x + this.bulletOffset;
      if (this.orientation == 'down') y = y + this.impactOffset;
    };

    explosions.push({id: index, x: x, y: y});
  }

  static remove(id){
    _.remove(explosions, explosion => explosion.id == id);
  }
}