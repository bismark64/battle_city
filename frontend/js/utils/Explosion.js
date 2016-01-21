import _ from 'lodash';

let explosions = [];

export default class Explosion {
  constructor(options={}){
    this.bulletSize = 50;
    this.bulletSpeed = 20;
    this.bulletOffset = 12.5;
    this.impactOffset = this.bulletSize - this.bulletSpeed;
  }

  static get(){
    return explosions;
  }

  save(bullet){
    let x = bullet.x;
    let y = bullet.y;
    const index = explosions.length + 1;

    if (bullet.orientation == 'left' || bullet.orientation == 'right') {
      y = y + this.bulletOffset;
      if (bullet.orientation == 'right') x = x + this.impactOffset;
    } else{
      x = x + this.bulletOffset;
      if (bullet.orientation == 'down') y = y + this.impactOffset;
    };

    explosions.push({id: index, x: x, y: y});
  }

  remove(explosionId){
    _.remove(explosions, explosion => explosion.id == explosionId);
  }
}