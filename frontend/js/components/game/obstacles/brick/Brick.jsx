import React, { Component, PropTypes } from 'react';

import GameActions from '../../../../actions/GameActions';

export default class Brick extends Component {
  static propTypes = {
    type: PropTypes.string
  };

  render(){
    const { type, x, y } = this.props;
    const classes = type || '';

    return(
      <div className={ "brick " + classes } data-x={x} data-y={y}></div>
    );
  }
}