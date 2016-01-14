import React, { Component } from 'react';
import BaseComponent from '../../BaseComponent';
import PlayerActions from '../../../actions/PlayerActions';
import PlayerStore from '../../../stores/PlayerStore';

const getPlayerState = () => PlayerStore.getState();

export default class Player extends BaseComponent {
  constructor(props){
    super(props);

    this.state = getPlayerState();
    this._bind('_onChange');
  }

  onKeyDown(e){
    PlayerActions.makeMove(e.which);
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
    this.setState(getPlayerState());
  };

  render(){
    const { x, y, orientation } = this.state;

    return <div id="tank-player" className={`rotating ${orientation}`} style={{top: y, left: x}}></div>;
  }
}