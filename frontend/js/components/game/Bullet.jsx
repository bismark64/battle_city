import React, { Component } from 'react';
import BaseComponent from '../BaseComponent';
import GameActions from '../../actions/GameActions';

export default class Bullet extends BaseComponent {
  constructor(props){
    super(props);

    this._bind('move');
  }

  move(){
    GameActions.moveBullet(this.props.id);
  }

  componentDidMount(){
    this.interval = setInterval(this.move, 5);
  }

  componentWillUnmount(){
    clearInterval(this.interval);
  }

  render(){
    const { x, y, orientation } = this.props;

    return <div className={`bullet ${orientation}`} style={{top: y, left: x}}></div>;
  }
}