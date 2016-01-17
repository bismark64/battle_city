import _ from 'lodash';

export default class Explosion {
  constructor(options={}){
    this.explosions = [];
    this.bulletSize = 50;
    this.bulletSpeed = 20;
    this.bulletOffset = 12.5;
    this.impactOffset = this.bulletSize - this.bulletSpeed;
  }

  create(bullet){
    let x = bullet.x;
    let y = bullet.y;
    let index = this.explosions.length + 1;

    if (bullet.orientation == 'left' || bullet.orientation == 'right') {
      y = bullet.y + this.bulletOffset;
      if (bullet.orientation == 'right') x = bullet.x + this.impactOffset;
    } else{
      x = bullet.x + this.bulletOffset;
      if (bullet.orientation == 'down') y = bullet.y + this.impactOffset;
    };

    this.explosions.push({id: index, x: x, y: y});
  }

  remove(explosionId){
    _.remove(this.explosions, explosion => explosion.id == explosionId);
    return true;
  }

  get(){
    return this.explosions;
  }
}