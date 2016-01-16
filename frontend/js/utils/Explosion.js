import _ from 'lodash';

export default class Explosion {
  constructor(options={}){
    this.explosions = [];
    this.bulletOffset = 10;
    this.impactOffset = 15;
  }

  create(bullet){
    let x = bullet.x;
    let y = bullet.y;
    let index = this.explosions.length + 1;

    if (bullet.orientation == 'left' || bullet.orientation == 'right') {
      y = bullet.y - this.bulletOffset;
      //x = (bullet.orientation == 'left') ? (bullet.x - this.impactOffset) : (bullet.x);
    } else{
      x = bullet.x - this.bulletOffset;
      //y = (bullet.orientation == 'up') ? (bullet.y - this.impactOffset) : (bullet.y + this.impactOffset);
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