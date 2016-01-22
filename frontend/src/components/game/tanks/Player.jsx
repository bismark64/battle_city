import React, { Component } from 'react';
import _ from 'lodash';

import BaseComponent from '../../BaseComponent';
import GameActions from '../../../actions/GameActions';

export default class Player extends BaseComponent {
  constructor(props){
    super(props);

    this._bind('_onKeyDown', '_onKeyUp');

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
    const key = e.which;

    if( (this._isEscapeKey(key) || this._isEnterKey(key)) && !this.props.gameOver ){
      GameActions.togglePause();
    }

    if (this.props.playing && !this.props.gameOver) {

      if (this._isShootKey(key)) {
        GameActions.shoot(this.props.data);
      }else if(this._isControlKey(key)){
        GameActions.inputKeyDown(key);
      }

    }
  }

  _onKeyUp(e){
    const key = e.which;

    if(this._isControlKey(key)){
      GameActions.inputKeyUp(key);
    }
  }

  componentDidMount(){
    document.addEventListener('keydown', this._onKeyDown);
    document.addEventListener('keyup', this._onKeyUp);
  }

  componentWillUnmount(){
    document.removeEventListener('keydown', this._onKeyDown);
    document.addEventListener('keyup', this._onKeyUp);
  }

  render(){
    const { playing, gameOver } = this.props;
    const { x, y, orientation } = this.props.data;
    const show = (playing && !gameOver) ? '' : 'hidden';

    return <div id="player" className={`tank ${orientation} ${show}`} style={{top: y, left: x}}></div>;
  }
}