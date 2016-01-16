import React, { Component } from 'react';

export default class Eagle extends Component {
  render(){
    const { x, y } = this.props;

    return(
      <div id="eagle" style={{ top: y, left: x }}></div>
    );
  }
}