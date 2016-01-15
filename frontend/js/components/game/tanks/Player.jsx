import React, { Component } from 'react';
import _ from 'lodash';

import BaseComponent from '../../BaseComponent';
import PlayerActions from '../../../actions/PlayerActions';
import GameActions from '../../../actions/GameActions';
import PlayerStore from '../../../stores/PlayerStore';

export default class Player extends BaseComponent {
  constructor(props){
    super(props);

    this.state = PlayerStore.getState();
    this._bind('_onChange', 'onKeyDown');

    this.KEY = {
      controls:{
        left: 37,
        up: 38,
        right: 39,
        down: 40,
      },
      shoot: 32,
      enter: 13,
      escape: 27
    };
  }

  _isShootKey(key){
    return key === this.KEY.shoot;
  }

  _isControlKey(key){
    return _.includes(_.values(this.KEY.controls), key);
  }

  onKeyDown(e){
    let key = e.which;

    if (this._isShootKey(key)) {
      GameActions.shoot(this.state);
    }else if(this._isControlKey(key)){
      PlayerActions.makeMove(key);
    }
  }

  componentDidMount(){
    document.addEventListener('keydown', this.onKeyDown);
    PlayerStore.addChangeListener(this._onChange);
  }

  componentWillUnmount(){
    document.removeEventListener('keydown', this.onKeyDown);
    PlayerStore.removeChangeListener(this._onChange);
  }

  _onChange(){
    this.setState(PlayerStore.getState());
  };

  render(){
    const { x, y, orientation } = this.state;

    return <div id="tank-player" className={`rotating ${orientation}`} style={{top: y, left: x}}></div>;
  }
}