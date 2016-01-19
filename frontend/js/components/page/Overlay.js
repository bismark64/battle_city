import React, { Component } from 'react';

export default class Overlay extends Component{
  getClasses(){
    return this.props.showIf ? '' : 'hidden';
  }

  render(){
    const { id, children } = this.props;

    return(
      <div id={id} className={this.getClasses()}>
        {children}
      </div>
    );
  }
}