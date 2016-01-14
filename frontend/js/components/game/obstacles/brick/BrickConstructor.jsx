import React from 'react';
import Brick from './Brick';

import GameActions from '../../../../actions/GameActions';

const BRICK_SIZE = 12.5;

const isEven = (n) => n % 2 == 0;

const getPositionHorizontal = (parentPosition, index) =>{
  let parentX = parentPosition[0];
  let parentY = parentPosition[1];

  let x, y;

  if (index >= 0 && index <= 3) {
    x = parentX + (BRICK_SIZE*index);
    y = parentY;
  } else{
    x = BRICK_SIZE*index;
    y = parentY + BRICK_SIZE;
  };

  return [x,y, BRICK_SIZE];
};

const getPositionVertical = (parentPosition, index) =>{
  let parentX = parentPosition[0];
  let parentY = parentPosition[1];

  let x, y;

  if (isEven(index)) {
    x = parentX;
    y = parentY + (BRICK_SIZE*(index/2));
  } else{
    x = parentX + BRICK_SIZE;
    y = parentY + (BRICK_SIZE*((index-1)/2) );
  };

  return [x,y, BRICK_SIZE];
};

export default {
  horizontal: function(parentPosition){
    let pos = [];

    for (let i = 0; i < 8; i++) {
      pos[i] = getPositionHorizontal(parentPosition, i);
    };

    GameActions.addObstaclePoints(pos);

    return(
      <div className='horizontal'>
        <Brick x={pos[0][0]} y={pos[0][1]} />
        <Brick type="brick2" x={pos[1][0]} y={pos[1][1]} />
        <Brick x={pos[2][0]} y={pos[2][1]} />
        <Brick type="brick2" x={pos[3][0]} y={pos[3][1]} />
        <Brick type="brick2" x={pos[4][0]} y={pos[4][1]} />
        <Brick x={pos[5][0]} y={pos[5][1]} />
        <Brick type="brick2" x={pos[6][0]} y={pos[6][1]} />
        <Brick x={pos[7][0]} y={pos[7][1]} />
      </div>
    );
  },
  vertical: function(parentPosition){
    let pos = [];

    for (let i = 0; i < 8; i++) {
      pos[i] = getPositionVertical(parentPosition, i);
    };

    GameActions.addObstaclePoints(pos);

    return(
      <div className='vertical'>
        <Brick x={pos[0][0]} y={pos[0][1]} />
        <Brick type="brick2" x={pos[1][0]} y={pos[1][1]} />
        <Brick type="brick2" x={pos[2][0]} y={pos[2][1]} />
        <Brick x={pos[3][0]} y={pos[3][1]} />
        <Brick x={pos[4][0]} y={pos[4][1]} />
        <Brick type="brick2" x={pos[5][0]} y={pos[5][1]} />
        <Brick type="brick2" x={pos[6][0]} y={pos[6][1]} />
        <Brick x={pos[7][0]} y={pos[7][1]} />
      </div>
    );
  }
};