import React, { Component, PropTypes } from 'react';
import _ from 'lodash';

export default class Obstacle extends Component {
  static propTypes = {
    type: PropTypes.string
  };

  getClasses(){
    const { type, id, orientation } = this.props;
    let classes = type;
    
    if(type == 'brick'){
      if (orientation == 'horizontal' && _.includes([1,3,4,6], id) || orientation == 'vertical' && _.includes([1,2,5,6], id) ){
        classes = 'brick brick2';
      }
    } 
    return classes;
  }

  render(){
    const { x, y } = this.props;

    return(
      <div className={this.getClasses()} style={{ top: y, left: x }}></div>
    );
  }
}