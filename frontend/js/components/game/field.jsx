import React, { Component } from 'react';

import Obstacle from './obstacles/obstacle';
import Eagle from './eagle';
import Player from './tanks/Player';

export default class Field extends Component {
  render(){
    const { bricks, metals } = this.props;

    return(
      <section id="game-canvas">
        {bricks.map((obstacle, index) => {
          return(
            <Obstacle xPos={obstacle[0]} yPos={obstacle[1]} orientation={obstacle[2]} type="brick" key={index} />
          );
        })}

        {metals.map((obstacle, index) => {
          return(
            <Obstacle xPos={obstacle[0]} yPos={obstacle[1]} orientation={obstacle[2]} type="metal" key={index} />
          );
        })}

        <Player />

        <Eagle xPos="300" yPos="600" />
      </section>
    );
  }
}