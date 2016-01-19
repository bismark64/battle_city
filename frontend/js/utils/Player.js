import Immutable, {List, Range} from 'immutable';
import _ from 'lodash';

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
export default class Player {
  constructor(options={}){
    this.size = options.size || 50;
    this.speed = options.speed || 10;
    this.initialPosition = [150,600];
    this.position = Immutable.fromJS(this.initialPosition);
    this.orientation = 'up';
    this.allowedControlKeys =  {
      x: [KEY.controls.left, KEY.controls.right],
      y: [KEY.controls.down, KEY.controls.up]
    };

    this.mapSize = options.mapSize || Range(0, (650-this.size+this.speed));

    this.dataStore = options.dataStore;
  }

  withinField(x,y){
    return x >= this.mapSize.first() && x <= this.mapSize.last() && y >= this.mapSize.first() && y <= this.mapSize.last();
  }

  // Detect collision with projected position and previously stored obstacles
  collision(x,y){
    let c = false;
    let obstacles = _.flatten([
      this.dataStore.getObstacles(),
      this.dataStore.getTanks()
    ]);

    if(obstacles === null){
      alert('Error: Obstacles not loaded.');
      return true;
    }

    if (!this.withinField(x,y)) { return true };

    _.forEach(obstacles, (obstacle) => {
      let rect1 = {x: x, y: y, width: this.size, height: this.size};
      let rect2 = {x: obstacle.x, y: obstacle.y, width: obstacle.size, height: obstacle.size };

      let collided = rect1.x < rect2.x + rect2.width && rect1.x + rect1.width > rect2.x && rect1.y < rect2.y + rect2.height && rect1.height + rect1.y > rect2.y;

      if(collided){
        c = true;
        return false;
      }
    });

    return c;
  }

  // Validate key pressed
  shouldKeyUpdateAxis(key, axis=null){
    let validKeys = (axis === null) ? _.values(this.allowedControlKeys) : this.allowedControlKeys[axis];
    return _.includes(validKeys, key);
  }

  // Update Player position
  updatePosition(key){
    let currentX = this.position.first();
    let currentY = this.position.last();

    let newX = calculateNewPosition(currentX, key, this.speed);
    let newY = calculateNewPosition(currentY, key, this.speed);

    if (this.shouldKeyUpdateAxis(key, 'x') && !this.collision(newX, currentY) ) {
      this.position = this.position.update(0, () => newX );
    }
    if (this.shouldKeyUpdateAxis(key, 'y') && !this.collision(currentX, newY) ) {
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
    this.position = Immutable.fromJS([x,y]);
  }

  resetOrientation(orientation){
    this.orientation = orientation;
  }

  // Getters
  get(){
    return {
      x: this.position.first(),
      y: this.position.last(),
      orientation: this.orientation
    };
  }
}

