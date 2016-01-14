import React, { Component } from 'react';

import GameActions from '../../actions/GameActions';

const EAGLE_SIZE = 50;

export default class Eagle extends Component {
  componentWillMount(){
    const { xPos, yPos } = this.props;

    //Add Eagle as Obstacle
    GameActions.addObstaclePoints([[parseInt(xPos), parseInt(yPos), EAGLE_SIZE]]);
  }

  render(){
    const { xPos, yPos } = this.props;

    return(
      <div id="eagle" style={{ top: yPos, left: xPos }}></div>
    );
  }
}