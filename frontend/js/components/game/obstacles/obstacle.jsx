import React, { Component, PropTypes } from 'react';
import Constructor from './Constructor';

export default class Obstacle extends Component {
  constructor(props){
    super(props);

    this.state = {obstacles: ''};
  }

  static propTypes = {
    type: PropTypes.string.isRequired,
    orientation: PropTypes.string.isRequired
  };

  componentDidMount(){
    let obstacles = this.getObstacles()
    this.setState({obstacles: obstacles});
  }

  getObstacles(){
    const { orientation, type, xPos, yPos } = this.props;
    return new Constructor(type, orientation, [xPos, yPos]).build();
  }

  render(){
    const { xPos, yPos } = this.props;
    const { obstacles } = this.state;

    return(
      <div className="obstacle" style={{ top: yPos, left: xPos }}>
        {obstacles}
      </div>
    );
  }
}