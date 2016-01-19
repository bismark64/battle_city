import Immutable, {List, Range} from 'immutable';
import _ from 'lodash';

import Game from './Game';
import Map from './Map';
import Player from './Player';
import Bullet from './Bullet';
import Explosion from './Explosion';
import Tank from './Tank';

export default class GameDataStore{
  constructor(options={}){
    this.game = new Game({dataStore: this});
    this.map = new Map({dataStore: this});
    this.player = new Player({dataStore: this});
    this.bullet = new Bullet({dataStore: this});
    this.tank = new Tank({dataStore: this});
    this.explosion = new Explosion();
  }

  initialState(){
    return{
      playing: this.isPlaying(),
      over: this.isOver(),
      score: this.getScore(),
      level: this.getLevel(),
      lives: this.getLives(),
      player: this.getPlayerState(),
      obstacles: this.getObstacles(),
      bullets: this.getBullets(),
      explosions: this.getExplosions(),
      tanks: this.getTanks()
    };
  }

  //Game
  startGame(map){
    this.storeObstacles(map.obstacles);
    this.createTanks(map.tanks);
    this.player.resetPosition(150,600);
    this.player.resetOrientation('up');
    this.game.start();
    return true;
  }

  togglePauseGame(){
    this.game.togglePause();
    return true;
  }

  gameOver(){
    this.game.gameOver();
    return true;
  }

  updateScore(points){
    this.game.updateScore(points);
  }

  isPlaying(){
    return this.game.isPlaying();
  }

  isOver(){
    return this.game.isOver();
  }

  getScore(){
    return this.game.getScore();
  }

  getLives(){
    return this.game.getLives();
  }

  getLevel(){
    return this.game.getLevel();
  }

  // Map
  storeObstacles(obstacles){
    this.map.saveObstacles(obstacles);
    return true
  }

  getObstacles(){
    return this.map.getObstacles();
  }

  getMapGraph(){
    return this.map.getGridGraph();
  }

  getMapPath(from, to){
    return this.map.getPath(from, to);
  }

  removeObstacles(obstacles){
    this.map.removeObstacles(obstacles);
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
  createExplosion(bullet){
    this.explosion.create(bullet);
  }

  removeExplosion(explosionId){
    this.explosion.remove(explosionId);
    return true;
  }

  getExplosions(){
    return this.explosion.get();
  }

  // Tank
  createTanks(tanks){
    this.tank.create(tanks);
  }

  storeTankPath(pathData){
    this.tank.storePath(pathData);
    return true;
  }

  moveTank(tankId){
    this.tank.move(tankId);
    return true;
  }

  removeTank(tankId){
    this.tank.destroy(tankId);
  }

  getTanks(){
    return this.tank.get();
  }
}