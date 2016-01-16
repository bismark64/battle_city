import Immutable, {List, Range} from 'immutable';
import _ from 'lodash';

import Player from './Player';
import Obstacle from './Obstacle';
import Bullet from './Bullet';
import Explosion from './Explosion';

export default class GameDataStore{
  constructor(options={}){
    this.player = new Player();
    this.obs = new Obstacle({
      player: this.player
    });
    this.explosion = new Explosion();
    this.bullet = new Bullet({
      explosion: this.explosion,
      obstacles: this.obs
    });
  }

  // Obstacles
  storeObstacles(obstacles){
    this.obs.save(obstacles);
    return true
  }

  getObstacles(){
    return this.obs.get();
  }

  getObstacleBricks(){
    return this.obs.getBricks();
  }

  //Player
  playerMove(key){
    this.player.move(key);
    return true;
  }

  getPlayerState(){
    return this.player.get();
  }

  //Bullet
  createBullet(bulletData){
    this.bullet.create(bulletData);
    return true;
  }

  moveBullet(bulletId){
    this.bullet.move(bulletId);
    return true;
  }

  getBullets(){
    return this.bullet.get();
  }

  //Explosion
  removeExplosion(explosionId){
    this.explosion.remove(explosionId);
    return true;
  }

  getExplosions(){
    return this.explosion.get();
  }

}