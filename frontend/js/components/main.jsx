import React, {Component} from 'react';
import { Button } from 'react-bootstrap';
import Header from './page/header';
import Game from './game/main';

export default class Main extends Component {
  render(){
    return(
      <div>
        <Header />
        <Game />
      </div>
    )
  }
}