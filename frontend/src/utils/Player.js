import { List } from 'immutable';
import _ from 'lodash';

import Collisionable from './Collisionable';

const KEY = {
  controls:{
    left: 37,
    up: 38,
    right: 39,
    down: 40,
  },
  shoot: 32,
  enter: 13,
  escape: 27
};

const KEY_TO_OPERATORS = {
  left: '-',
  right: '+',
  up: '-',
  down: '+'
};

const OPERATORS = {
  '+': function(a, b){ return a + b },
  '-': function(a, b){ return a - b }
};

// Get name from KEY object given key code
const getKeyName = (key, scope=null) => {
  return (scope === null) ? _.findKey(KEY, (value) => value === key ) : _.findKey(KEY[scope], (value) => value === key );
}

// Calculate projected position given position and key code
const calculateNewPosition = (currentPosition, key, speed) => {
  let op = KEY_TO_OPERATORS[getKeyName(key, 'controls')];
  return OPERATORS[op](currentPosition, speed);
}

// Main class 
export default class Player extends Collisionable {
  constructor(options={}){
    super({
      size: 50, 
      speed: 10
    });
    this.game = options.game;
    this.x = 150;
    this.y = 600;
    this.velX = 0;
    this.velY = 0;
    this.orientation = 'up';
    this.allowedAxisKeys =  {
      x: [KEY.controls.left, KEY.controls.right],
      y: [KEY.controls.down, KEY.controls.up]
    };
  }

  _getObstacles(){
    return _.flatten([
      this.game.getObstacles(),
      this.game.getTanks()
    ]);
  }

  // Validate key pressed
  shouldKeyUpdateAxis(key, axis=null){
    const validKeys = (axis === null) ? _.values(this.allowedAxisKeys) : this.allowedAxisKeys[axis];
    return _.includes(validKeys, key);
  }

  // Update Player position
  _updatePosition(){
    const obstacles = this._getObstacles();

    const newX = this.x + this.velX;
    const newY = this.y + this.velY;

    if( _.isEmpty(this.collision(obstacles, newX, this.y)) ) this.x = newX;
    if( _.isEmpty(this.collision(obstacles, this.x, newY)) ) this.y = newY;
  }

  _updateOrientation(key){
    this.orientation = getKeyName(key, 'controls');
  }

  // Public Methods
  inputKeyDown(key){
    this._updateOrientation(key);

    switch (key) {
      case KEY.controls.up:
        this.velY = -1*this.speed;
        break;
      case KEY.controls.down:
        this.velY = this.speed;
        break;
      case KEY.controls.left:
        this.velX = -1*this.speed;
        break;
      case KEY.controls.right:
        this.velX = this.speed;
        break;
    }

    this._updatePosition();
  }

  inputKeyUp(key){
    switch (key) {
      case KEY.controls.up:
        this.velY = 0;
        break;
      case KEY.controls.down:
        this.velY = 0;
        break;
      case KEY.controls.left:
        this.velX = 0;
        break;
      case KEY.controls.right:
        this.velX = 0;
        break;
    }
    this._updatePosition();
  }

  // Reseters
  resetPosition(x,y){
    this.x = x;
    this.y = y;
  }

  resetOrientation(orientation){
    this.orientation = orientation;
  }

  // Getters
  get(){
    return {
      x: this.x,
      y: this.y,
      orientation: this.orientation
    };
  }
}

