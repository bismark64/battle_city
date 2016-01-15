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
    //GameStore.addChangeListener(this._onChange);
  }

  componentWillUnmount(){
    clearInterval(this.interval);
    //GameStore.removeChangeListener(this._onChange);
  }

  // _onChange(){
  //   this.setState(GameStore.getBulletUpdate());
  // };

  render(){
    const { x, y, orientation } = this.props;

    return <div className={`bullet ${orientation}`} style={{top: y, left: x}}></div>;
  }
}