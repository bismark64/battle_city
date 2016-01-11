import React, { Component, PropTypes } from 'react';

export default class Brick extends Component {
  static propTypes = {
    type: PropTypes.string
  };

  render(){
    const { type } = this.props;
    const classes = type || '';

    return(
      <div className={ "brick " + classes }></div>
    );
  }
}