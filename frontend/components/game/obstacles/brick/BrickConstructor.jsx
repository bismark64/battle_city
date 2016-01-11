import React from 'react';
import Brick from './Brick';

export default {
  top: function(classes='top'){
    return(
      <div className={classes}>
        <Brick /><Brick type="brick2" /><Brick /><Brick type="brick2" /><Brick type="brick2" /><Brick /><Brick type="brick2" /><Brick />
      </div>
    );
  },
  bottom: function(){
    return this.top('bottom');
  },
  left: function(classes='left'){
    return(
      <div className={classes}>
        <Brick /><Brick type="brick2" /><Brick type="brick2" /><Brick /><Brick /><Brick type="brick2" /><Brick type="brick2" /><Brick />
      </div>
    );
  },
  right: function(){
    return this.left('right');
  },
  full: function(){
    return(
      <div className="full">
        <Brick /><Brick type="brick2" /><Brick /><Brick type="brick2" /><Brick type="brick2" /><Brick /><Brick type="brick2" /><Brick />
        <Brick /><Brick type="brick2" /><Brick /><Brick type="brick2" /><Brick type="brick2" /><Brick /><Brick type="brick2" /><Brick />
      </div>
    );
  }
};