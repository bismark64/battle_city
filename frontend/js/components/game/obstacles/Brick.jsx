import React, { Component, PropTypes } from 'react';
import _ from 'lodash';

export default class Brick extends Component {
  static propTypes = {
    type: PropTypes.string
  };

  getClasses(){
    const { type, id, obstacleOrientation } = this.props;
    let classes = type;
    
    if(type == 'brick'){
      if (obstacleOrientation == 'horizontal' && _.includes([1,3,4,6], id) || obstacleOrientation == 'vertical' && _.includes([1,2,5,6], id) ){
        classes = 'brick brick2';
      }
    } 
    return classes;
  }

  render(){
    const { type, x, y, id } = this.props;

    return(
      <div className={this.getClasses()} data-x={x} data-y={y} data-relative-id={id}></div>
    );
  }
}