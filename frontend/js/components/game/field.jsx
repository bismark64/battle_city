import React, { Component } from 'react';

import Eagle from './Eagle';
import Obstacle from './obstacles/Obstacle';
import Player from './tanks/Player';
import Bullet from './Bullet';
import Explosion from './Explosion';

export default class Field extends Component {
  render(){
    const { bricks, metals, bullets, explosions } = this.props;

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

        {bullets.map((bullet, index) => {
          return(
            <Bullet id={bullet.id} x={bullet.x} y={bullet.y} orientation={bullet.orientation} key={index} />
          );
        })}

        {explosions.map((exp, index) => {
          return(
            <Explosion id={exp.id} x={exp.x} y={exp.y} key={index} />
          );
        })}

        <Player />

        <Eagle xPos="300" yPos="600" />
      </section>
    );
  }
}