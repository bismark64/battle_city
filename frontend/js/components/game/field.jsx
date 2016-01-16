import React, { Component } from 'react';

import Eagle from './Eagle';
import Obstacle from './obstacles/Obstacle';
import Player from './tanks/Player';
import Bullet from './Bullet';
import Explosion from './Explosion';

export default class Field extends Component {
  render(){
    const { player, bricks, metals, bullets, explosions } = this.props;

    return(
      <section id="game-canvas">
        {bricks.map((obstacle, index) => {
          return(
            <Obstacle x={obstacle.x} y={obstacle.y} orientation={obstacle.orientation} type={obstacle.type} bricks={obstacle.bricks} key={index} />
          );
        })}

        {metals.map((obstacle, index) => {
          return(
            <Obstacle x={obstacle.x} y={obstacle.y} orientation={obstacle.orientation} type={obstacle.type} bricks={obstacle.bricks} key={index} />
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

        <Player data={player} />

        <Eagle x="300" y="600" />
      </section>
    );
  }
}