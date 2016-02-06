import Immutable, {List, Range} from 'immutable';
import _ from 'lodash';

import GameState from './GameState';
import Map from './Map';
import Player from './Player';
import Bullet from './Bullet';
import Explosion from './Explosion';
import Tank from './Tank';

export default class Game {
  constructor(options={}){
    this.gameState = new GameState();
    this.map = new Map({game: this});
    this.player = new Player({game: this});
  }

  state(){
    return _.merge(this.gameState.get(), {
      player: this.getPlayerState(),
      obstacles: this.getObstacles(),
      bullets: this.getBullets(),
      explosions: this.getExplosions(),
      tanks: this.getTanks()
    });
  }

  //Game
  startGame(map){
    this.player.reset();
    return true;
  }

  mapLoaded(mapData){
    const loaded = mapData != null;
    if (loaded) {
      this.storeObstacles(mapData.obstacles);
      this.createTanks(mapData.tanks);
      this.gameState.start();
    }
    return mapData;
  }

  togglePauseGame(){
    this.gameState.togglePause();
    return true;
  }

  gameWin(){
    this.gameState.gameWin();
    return true;
  }

  gameOver(){
    this.gameState.gameOver();
    Tank.reset();
    return true;
  }

  updateScore(points){
    this.gameState.updateScore(points);
  }

  decreasePlayerLives(){
    this.gameState.decreaseLives();
  }

  // Map
  storeObstacles(obstacles){
    this.map.saveObstacles(obstacles);
    return true
  }

  getObstacles(){
    return this.map.getObstacles();
  }

  getMapMatrix(){
    return this.map.getMatrix();
  }

  removeObstacles(obstacles){
    this.map.removeObstacles(obstacles);
  }

  //Player
  inputKeyDown(key){
    this.player.inputKeyDown(key);
    return true;
  }

  inputKeyUp(key){
    this.player.inputKeyUp(key);
    return true;
  }

  getPlayerState(){
    return this.player.get();
  }

  hitPlayer(){
    this.player.hit();
  }

  //Bullet
  createBullet(bulletData){
    new Bullet({game: this, data: bulletData}).save();
    return true;
  }

  moveBullet(bulletId){
    Bullet.move(bulletId);
    return true;
  }

  getBullets(){
    return Bullet.get();
  }

  //Explosion
  createExplosion(bullet){
    new Explosion(bullet).save()
  }

  removeExplosion(explosionId){
    Explosion.remove(explosionId);
    return true;
  }

  getExplosions(){
    return Explosion.get();
  }

  // Tank
  createTanks(tanks){
    // Get first 3 tanks
    const startTanks = tanks.splice(0, 1);
    // Store the rest
    Tank.setTankQueue(tanks);
    // Display start tanks
    _.each(startTanks, tank => {
      new Tank({game: this, tankData: tank}).save()
    });
  }

  addNewTank(){
    // const tankQueue = Tank.getTankQueue();

    // if (!_.isEmpty(tankQueue)) {
    //   const newTank = tankQueue.shift();
    //   new Tank({game: this, tankData: newTank}).save();
    // }
    return true;
  }

  moveTank(tankId){
    Tank.move(tankId);
    return true;
  }

  removeTank(tankId){
    Tank.destroy(tankId);

    const tanks = Tank.getTanks();
    const tankQueue = Tank.getTankQueue();
    if(_.isEmpty(tanks) && _.isEmpty(tankQueue)) this.gameWin();
  }

  getTanks(){
    return Tank.getTanks();
  }
}