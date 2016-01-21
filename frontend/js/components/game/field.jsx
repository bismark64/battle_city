import React, { Component } from 'react';

import BaseComponent from '../BaseComponent';
import GameActions from '../../actions/GameActions';

import Obstacle from './Obstacle';
import Explosion from './Explosion';
import Player from './tanks/Player';
import Tank from './tanks/Tank';
import Bullet from './Bullet';

import Button from '../page/Button';
import Overlay from '../page/Overlay';

export default class Field extends BaseComponent {
  constructor(props){
    super(props);
    this._bind('startGame', 'createNewTank');
  }

  createNewTank(){
    if(this.props.playing) GameActions.createTank();
  }

  startGame(){
    GameActions.start(this.props.level);
  }

  componentDidMount(){
    this.interval = setInterval(this.createNewTank, (1000*6));
  }

  componentWillUnmount(){
    clearInterval(this.interval);
  }

  render(){
    const { level, over, win, score, playing, player, obstacles, bullets, explosions, tanks } = this.props;
    const anyObstacle = obstacles.length > 0;

    return(
      <section id="game-canvas">
        <Overlay showIf={!anyObstacle}>
          <h3>Level {level}</h3>
          <p className="text-center">
            <Button
              className="btn btn-success btn-lg"
              onClickEvent={this.startGame} >
              Start
            </Button>
          </p>
        </Overlay>

        <Overlay showIf={!playing && anyObstacle && !win}>
          <h3>Press Enter to Resume!</h3>
        </Overlay>

        <Overlay showIf={over}>
          <h3>Game Over</h3>
          <p className="text-center">
            <Button
              className="btn btn-success btn-lg"
              onClickEvent={this.startGame} >
              Play Again
            </Button>
          </p>
        </Overlay>

        <Overlay showIf={win}>
          <h3>You Win!</h3>
          <h4>Your Score: {score}</h4>
          <p className="text-center">
            <Button
              className="btn btn-success btn-lg"
              onClickEvent={this.startGame} >
              Play Again
            </Button>
          </p>
        </Overlay>

        <div id="field">
          <div id="obstacles">
            {obstacles.map((obstacle, index) => {
              return(
                <Obstacle id={obstacle.relativeId} x={obstacle.x} y={obstacle.y} type={obstacle.type} orientation={obstacle.orientation} key={index} />
              );
            })}
          </div>

          {bullets.map((bullet, index) => {
            return(
              <Bullet id={bullet.id} x={bullet.x} y={bullet.y} playing={playing} orientation={bullet.orientation} key={index} />
            );
          })}

          {explosions.map((exp, index) => {
            return(
              <Explosion id={exp.id} x={exp.x} y={exp.y} key={index} />
            );
          })}

          {tanks.map((tank, index) => {
            return(
              <Tank id={tank.id} x={tank.x} y={tank.y} type={tank.kind} playing={playing} key={index} />
            );
          })}

          <Player data={player} playing={playing} gameOver={over} />
        </div>

      </section>
    );
  }
}