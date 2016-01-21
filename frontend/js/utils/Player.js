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
    super({size: 50, speed: 10});

    this.game = options.game;

    this.position = List.of(150, 600);
    this.orientation = 'up';
    this.allowedAxisKeys =  {
      x: [KEY.controls.left, KEY.controls.right],
      y: [KEY.controls.down, KEY.controls.up]
    };
  }

  x(){ return this.position.first(); } 
  y(){ return this.position.last(); } 

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
  updatePosition(key){
    const currentX = this.x();
    const currentY = this.y();

    const newX = calculateNewPosition(currentX, key, this.speed);
    const newY = calculateNewPosition(currentY, key, this.speed);

    if (this.shouldKeyUpdateAxis(key, 'x') && _.isEmpty(this.collision(this._getObstacles(), newX, currentY))) {
      this.position = this.position.update(0, () => newX );
    }
    if (this.shouldKeyUpdateAxis(key, 'y') && _.isEmpty(this.collision(this._getObstacles(), currentX, newY))) {
      this.position = this.position.update(1, () => newY );
    }
  }

  updateOrientation(key){
    this.orientation = getKeyName(key, 'controls');
  }

  // Public Methods
  move(key){
    this.updatePosition(key);
    this.updateOrientation(key);
    return true
  }

  resetPosition(x,y){
    this.position = List.of(x,y);
  }

  resetOrientation(orientation){
    this.orientation = orientation;
  }

  // Getters
  get(){
    return {
      x: this.x(),
      y: this.y(),
      orientation: this.orientation
    };
  }
}

