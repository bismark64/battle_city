import React, { Component } from 'react';
import _ from 'lodash';

import BaseComponent from '../../BaseComponent';
import GameActions from '../../../actions/GameActions';

export default class Tank extends BaseComponent {
  constructor(props){
    super(props);
    this._bind('move', 'shoot');
  }

  move(){
    if(this.isActive()) GameActions.moveTank(this.props.id);
  }

  shoot(){
    if(this.isActive()){
      const data = _.merge(this.props, {shooter: 'tank'});
      GameActions.shoot(data);
    }
  }

  componentDidMount(){
    this.movingInterval = setInterval(this.move, 150);
    this.shootingInterval = setInterval(this.shoot, 2000);
  }

  componentWillUnmount(){
    clearInterval(this.movingInterval);
    clearInterval(this.shootingInterval);
  }

  isActive(){
    return this.props.playing && !this.props.gameOver;
  }
  
  render(){
    const { x, y, type, orientation } = this.props;

    return <div className={`tank ${type} ${orientation}`} style={{top: y, left: x}}></div>;
  }
}