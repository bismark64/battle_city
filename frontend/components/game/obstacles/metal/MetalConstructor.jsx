import React from 'react';
import Metal from './Metal';

export default {
  top: function(classes='top'){
    return(
      <div className={classes}>
        <Metal /><Metal />
      </div>
    );
  },
  bottom: function(){
    return this.top('bottom');
  },
  left: function(){
    return this.top('left');
  },
  right: function(){
    return this.top('right');
  },
  full: function(){
    return(
      <div className="full">
        <Metal /><Metal />
        <Metal /><Metal />
      </div>
    );
  }
};