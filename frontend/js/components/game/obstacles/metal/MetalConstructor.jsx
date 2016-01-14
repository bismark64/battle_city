import React from 'react';
import Metal from './Metal';

import GameActions from '../../../../actions/GameActions';

const BRICK_SIZE = 25;

const getPositionHorizontal = (parentPosition, index) =>{
  let parentX = parentPosition[0];
  let parentY = parentPosition[1];

  let x = parentX, y = parentY;

  if (index == 1) {
    x = parentX + BRICK_SIZE;
    y = parentY;
  } 

  return [x,y, BRICK_SIZE];
};

const getPositionVertical = (parentPosition, index) =>{
  let parentX = parentPosition[0];
  let parentY = parentPosition[1];

  let x = parentX, y = parentY;

  if (index == 1) {
    x = parentX;
    y = parentY + BRICK_SIZE;
  } 

  return [x,y, BRICK_SIZE];
};

export default {
  horizontal: function(parentPosition){
    let pos = [];

    for (let i = 0; i < 2; i++) {
      pos[i] = getPositionHorizontal(parentPosition, i);
    };

    GameActions.addObstaclePoints(pos);

    return(
      <div className='horizontal'>
        <Metal x={pos[0][0]} y={pos[0][1]} />
        <Metal x={pos[1][0]} y={pos[1][1]} />
      </div>
    );
  },
  vertical: function(parentPosition){
    let pos = [];

    for (let i = 0; i < 2; i++) {
      pos[i] = getPositionVertical(parentPosition, i);
    };

    GameActions.addObstaclePoints(pos);

    return(
      <div className='vertical'>
        <Metal x={pos[0][0]} y={pos[0][1]} />
        <Metal x={pos[1][0]} y={pos[1][1]} />
      </div>
    );
  },
};