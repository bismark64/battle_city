import React, { Component, PropTypes } from 'react';
import Brick from './Brick';

export default class Obstacle extends Component {
  static propTypes = {
    type: PropTypes.string.isRequired,
    orientation: PropTypes.string.isRequired
  };

  render(){
    const { x, y, bricks, orientation, type } = this.props;

    return(
      <div className="obstacle" style={{ top: y, left: x }}>
        <div className={orientation}>
          {bricks.map((brick, index) => {
            return(
              <Brick id={brick.relativeId} x={brick.x} y={brick.y} type={type} obstacleOrientation={orientation} key={index} />
            );
          })}
        </div>
      </div>
    );
  }
}