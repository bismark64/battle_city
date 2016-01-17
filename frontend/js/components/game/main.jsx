import React, { Component } from 'react';
import { Grid, Row, Col } from 'react-bootstrap';

import BaseComponent from '../BaseComponent';
import GameActions from '../../actions/GameActions';
import GameStore from '../../stores/GameStore';

import Field from './Field';
import Button from '../page/Button';

export default class Main extends BaseComponent {
  constructor(props){
    super(props);

    this.state = GameStore.initialState();

    this._bind('_onChange');
  }

  componentDidMount(){
    GameStore.addChangeListener(this._onChange);
    GameActions.loadMap(this.props.level);
  }

  _onChange(){
    this.setState(GameStore.getState());
  };

  render(){
    const { playing, score, level, lives, player, obstacles, bullets, explosions } = this.state;

    return(
      <Grid>
        <Row>
          <Col xs={9} md={9}>
            <Field
              playing={playing}
              player={player} 
              bricks={obstacles.bricks} 
              metals={obstacles.metals} 
              bullets={bullets} 
              explosions={explosions} />
          </Col>
          <Col xs={3} md={3}>
            <h1>Level {level}</h1>
            <h3>Score: {score}</h3>
            <h3>Lives: {lives}</h3>
          </Col>
        </Row>
      </Grid>
    )
  }
}