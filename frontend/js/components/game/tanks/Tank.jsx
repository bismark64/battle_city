import React, { Component } from 'react';

import BaseComponent from '../../BaseComponent';
import GameActions from '../../../actions/GameActions';

export default class Tank extends BaseComponent {
  constructor(props){
    super(props);
    this._bind('move');
  }

  move(){
    GameActions.moveTank(this.props.id);
  }

  componentDidMount(){
    this.interval = setInterval(this.move, 500);
  }

  componentWillUnmount(){
    clearInterval(this.interval);
  }
  
  render(){
    const { x, y, type } = this.props;

    return <div className={`tank ${type}`} style={{top: y, left: x}}></div>;
  }
}