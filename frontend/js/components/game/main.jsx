import React, { Component } from 'react';
import { Grid, Row, Col } from 'react-bootstrap';

import BaseComponent from '../BaseComponent';
import GameActions from '../../actions/GameActions';
import GameStore from '../../stores/GameStore';

import Field from './field';

export default class Main extends BaseComponent {
  constructor(props){
    super(props);

    this.state = {
      obs: {
        bricks: [],
        metals: []
      }
    };

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
    const { obs } = this.state;

    return(
      <Grid>
        <Row>
          <Col xs={9} md={9}>
            <Field bricks={obs.bricks} metals={obs.metals} />
          </Col>
          <Col xs={3} md={3}>
            <h1>Aca estoy!</h1>
          </Col>
        </Row>
      </Grid>
    )
  }
}