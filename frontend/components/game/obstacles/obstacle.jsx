import React, { Component, PropTypes } from 'react';
import Constructor from './Constructor';

export default class Obstacle extends Component {
  static propTypes = {
    type: PropTypes.string.isRequired,
    orientation: PropTypes.string.isRequired
  };

  getObstacles(){
    const { orientation, type } = this.props;

    return new Constructor(type, orientation).build();
  }

  render(){
    const { xPos, yPos } = this.props;
    const obstacles = this.getObstacles();

    return(
      <div className="obstacle" style={{ top: yPos, left: xPos }}>
        {obstacles}
      </div>
    );
  }
}