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

    this.keys = [];
  }

  _pushToKeys(key){
    this.keys.push(key);
  }

  _removeFromKeys(key){
    _.remove(this.keys, k => k == key );
  }

  _inKeys(key){
    return _.includes(this.keys, key);
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

    // Pause/Resume Game
    if( (this._isEscapeKey(key) || this._isEnterKey(key)) && !this.props.gameOver ){
      GameActions.togglePause();
    }
    // Control & Shoot keystrokes
    if (this.isActive()) {


      if (this._isShootKey(key)) {
        // Push new key to keys array
        if(!this._inKeys(key)) this._pushToKeys(key);
        // Standard shoot action
        GameActions.shoot(_.merge(this.props.data, {shooter: 'player'}));
        // If any other key was pressed fire control action
        if (this.keys.length > 1) {
          _.each(this.keys, k =>{
            if(this._isControlKey(k)) GameActions.inputKeyDown(k);
          });
        };

      }else if(this._isControlKey(key)){
        // Push new key to keys array
        if(!this._inKeys(key)) this._pushToKeys(key);
        // Standard control action
        GameActions.inputKeyDown(key);
        // If any other key was pressed fire shoot action
        if (this.keys.length > 1) {
          _.each(this.keys, k =>{
            if(this._isShootKey(key)) GameActions.shoot(this.props.data);
          });
        };
      }

    }
    
  }

  _onKeyUp(e){
    const key = e.which;

    if(this._isControlKey(key)){
      GameActions.inputKeyUp(key);
      this._removeFromKeys(key);
    }

    if (this._isShootKey(key)) this._removeFromKeys(key);
  }

  componentDidMount(){
    document.addEventListener('keydown', this._onKeyDown);
    document.addEventListener('keyup', this._onKeyUp);
  }

  componentWillUnmount(){
    document.removeEventListener('keydown', this._onKeyDown);
    document.addEventListener('keyup', this._onKeyUp);
  }

  isActive(){
    return this.props.playing && !this.props.gameOver;
  }

  render(){
    const { x, y, orientation } = this.props.data;
    const show = this.isActive() ? '' : 'hidden';

    return <div id="player" className={`tank ${orientation} ${show}`} style={{top: y, left: x}}></div>;
  }
}