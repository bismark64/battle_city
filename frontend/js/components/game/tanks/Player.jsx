import React, { Component } from 'react';
import _ from 'lodash';

import BaseComponent from '../../BaseComponent';
import GameActions from '../../../actions/GameActions';

export default class Player extends BaseComponent {
  constructor(props){
    super(props);

    this._bind('_onKeyDown');

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

  _isEscapeKey(key){
    return key === this.KEY.escape;
  }

  _isEnterKey(key){
    return key === this.KEY.enter;
  }

  _onKeyDown(e){
    let key = e.which;

    if(this._isEscapeKey(key)){
      GameActions.togglePause(key);
    }

    if(this._isEnterKey(key)){
      GameActions.start();
    }

    if (this.props.playing) {

      if (this._isShootKey(key)) {
        GameActions.shoot(this.props.data);
      }else if(this._isControlKey(key)){
        GameActions.playerMove(key);
      }

    }
  }

  componentDidMount(){
    document.addEventListener('keydown', this._onKeyDown);
  }

  componentWillUnmount(){
    document.removeEventListener('keydown', this._onKeyDown);
  }

  render(){
    const { x, y, orientation } = this.props.data;

    return <div id="tank-player" className={`rotating ${orientation}`} style={{top: y, left: x}}></div>;
  }
}