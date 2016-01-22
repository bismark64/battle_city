import React, { Component } from 'react';
import BaseComponent from '../BaseComponent';
import GameActions from '../../actions/GameActions';

export default class Bullet extends BaseComponent {
  constructor(props){
    super(props);
    this._bind('move');
  }

  move(){
    if(this.props.playing) GameActions.moveBullet(this.props.id);
  }

  componentDidMount(){
    this.interval = setInterval(this.move, 50);
  }

  componentWillUnmount(){
    clearInterval(this.interval);
  }

  render(){
    const { x, y, orientation } = this.props;

    return(
      <div className='bullet-container' style={{top: y, left: x}}>
        <span className={`bullet ${orientation}`}></span>
      </div>
    );
  }
}