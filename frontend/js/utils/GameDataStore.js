import Immutable, {List, Range} from 'immutable';
import _ from 'lodash';

import Game from './Game';
import Player from './Player';
import Obstacle from './Obstacle';
import Bullet from './Bullet';
import Explosion from './Explosion';

export default class GameDataStore{
  constructor(options={}){
    this.game = new Game();
    this.obs = new Obstacle();
    this.explosion = new Explosion();
    this.player = new Player({
      obstacles: this.obs
    });
    this.bullet = new Bullet({
      explosion: this.explosion,
      obstacles: this.obs
    });
  }

  initialState(){
    return{
      playing: this.isPlaying(),
      score: this.getScore(),
      level: 1,
      lives: this.getLives(),
      player: this.getPlayerState(),
      obstacles: this.getObstacles(),
      bullets: this.getBullets(),
      explosions: this.getExplosions()
    };
  }

  //Game
  startGame(){
    this.game.start();
    return true;
  }

  togglePauseGame(){
    this.game.togglePause();
    return true;
  }

  gameOver(data){
    this.game.over(data);
    return true;
  }

  isPlaying(){
    return this.game.isPlaying();
  }

  getScore(){
    return this.game.getScore();
  }

  getLives(){
    return this.game.getLives();
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