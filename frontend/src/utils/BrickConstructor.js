const BRICKS_LENGTH = {
  brick: 8,
  metal: 2,
  eagle: 1
};

export default class BrickConstructor {
  constructor(parent){
    this.parent = parent;
    this.type = this.parent.type;
    this.orientation = this.parent.orientation;
    this.regularBrickSize = 12.5;
    this.metalBrickSize = 25;
    this.bricksLength = BRICKS_LENGTH[this.type];
    this.fn = this.selectFunctionToApply();
  }

  isEven(n){
    return n % 2 == 0;
  }

  selectFunctionToApply(){
    let fn;
    if (this.type == 'brick' || this.type == 'eagle') {
      fn = (this.orientation == 'horizontal') ? this.buildRegularBrickHorizontal : this.buildRegularBrickVertical;
    } else{
      fn = (this.orientation == 'horizontal') ? this.buildMetalBrickHorizontal : this.buildMetalBrickVertical;
    };
    return fn;
  }

  // Regular Bricks
  buildRegularBrickHorizontal(index){
    let parentX = this.parent.x;
    let parentY = this.parent.y;

    let x, y;
    if (index >= 0 && index <= 3) {
      x = parentX + (this.regularBrickSize*index);
      y = parentY;
    } else{
      x = parentX + this.regularBrickSize*(index-4);
      y = parentY + this.regularBrickSize;
    };
    return {type: this.type, orientation: this.orientation, relativeId: index, x: x, y: y, size: this.regularBrickSize};
  }

  buildRegularBrickVertical(index){
    let parentX = this.parent.x;
    let parentY = this.parent.y;

    let x, y;
    if (this.isEven(index)) {
      x = parentX;
      y = parentY + (this.regularBrickSize*(index/2));
    } else{
      x = parentX + this.regularBrickSize;
      y = parentY + (this.regularBrickSize*((index-1)/2) );
    };
    return {type: this.type, orientation: this.orientation, relativeId: index, x: x, y: y, size: this.regularBrickSize};
  }

  //Metal Bricks
  buildMetalBrickHorizontal(index){
    let parentX = this.parent.x;
    let parentY = this.parent.y;

    let x = parentX, y = parentY;
    if (index == 1) {
      x = parentX + this.metalBrickSize;
      y = parentY;
    } 
    return {type: this.type, orientation: this.orientation, relativeId: index, x: x, y: y, size: this.metalBrickSize};
  }

  buildMetalBrickVertical(index){
    let parentX = this.parent.x;
    let parentY = this.parent.y;

    let x = parentX, y = parentY;
    if (index == 1) {
      x = parentX;
      y = parentY + this.metalBrickSize;
    } 
    return {type: this.type, orientation: this.orientation, relativeId: index, x: x, y: y, size: this.metalBrickSize};
  }

  buildBricks(){
    let bricks = [];
    for (let i = 0; i < this.bricksLength; i++) {
      bricks[i] = this.fn(i);
    };
    return bricks;
  }
}