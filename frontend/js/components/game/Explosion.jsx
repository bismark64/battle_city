import React, { Component } from 'react';
import BaseComponent from '../BaseComponent';
import GameActions from '../../actions/GameActions';

export default class Explosion extends BaseComponent {
  constructor(props){
    super(props);
    this._bind('destroy');
  }

  destroy(){
    GameActions.removeExplosion(this.props.id);
  }

  componentDidMount(){
    this.interval = setInterval(this.destroy, 300);
  }

  componentWillUnmount(){
    clearInterval(this.interval);
  }

  render(){
    const { x, y } = this.props;

    return <div className="explosion" style={{top: y, left: x}}></div>;
  }
}