import React, { Component } from 'react';
import Eagle from './eagle';
import Obstacle from './obstacles/obstacle';

export default class Field extends Component {
  render(){

    return(
      <section id="game-canvas">
        <Obstacle xPos="50" yPos="50" orientation="full" type="brick" />
        <Obstacle xPos="50" yPos="100" orientation="full" type="brick" />
        <Obstacle xPos="50" yPos="150" orientation="full" type="brick" />
        <Obstacle xPos="50" yPos="200" orientation="full" type="brick" />
        <Obstacle xPos="50" yPos="400" orientation="full" type="brick" />
        <Obstacle xPos="50" yPos="450" orientation="full" type="brick" />
        <Obstacle xPos="50" yPos="500" orientation="full" type="brick" />

        <Obstacle xPos="250" yPos="600" orientation="right" type="brick" />
        <Obstacle xPos="100" yPos="400" orientation="left" type="brick" />
        <Obstacle xPos="150" yPos="300" orientation="top" type="brick" />
        <Obstacle xPos="200" yPos="350" orientation="bottom" type="brick" />

        <Obstacle xPos="500" yPos="350" orientation="top" type="metal" />
        <Obstacle xPos="500" yPos="250" orientation="bottom" type="metal" />
        <Obstacle xPos="500" yPos="100" orientation="left" type="metal" />
        <Obstacle xPos="600" yPos="350" orientation="right" type="metal" />

        <Obstacle xPos="600" yPos="0" orientation="full" type="metal" />

        <Eagle xPos="300" yPos="600" />
      </section>
    );
  }
}