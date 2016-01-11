import React, { Component } from 'react';

export default class Eagle extends Component {
  render(){
    const { xPos, yPos } = this.props;

    return(
      <div id="eagle" style={{ top: yPos, left: xPos }}></div>
    );
  }
}