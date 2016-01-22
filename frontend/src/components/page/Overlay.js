import React, { Component } from 'react';

export default class Overlay extends Component{
  getClasses(){
    return this.props.showIf ? '' : 'hidden';
  }

  render(){
    const { children } = this.props;

    return(
      <div className={`overlay ${this.getClasses()}`}>
        {children}
      </div>
    );
  }
}