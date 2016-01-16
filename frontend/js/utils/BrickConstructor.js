export default class BrickConstructor {
  constructor(parent){
    this.parent = parent;
    this.regularBrickSize = 12.5;
    this.metalBrickSize = 25;
    this.bricksLength = (this.parent.type == 'brick') ? 8 : 2;
    this.fn = this.selectFunctionToApply();
  }

  isEven(n){
    return n % 2 == 0;
  }

  selectFunctionToApply(){
    let fn;
    if (this.parent.type == 'brick') {
      fn = (this.parent.orientation == 'horizontal') ? this.buildRegularBrickHorizontal : this.buildRegularBrickVertical;
    } else{
      fn = (this.parent.orientation == 'horizontal') ? this.buildMetalBrickHorizontal : this.buildMetalBrickVertical;
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
      x = this.regularBrickSize*index;
      y = parentY + this.regularBrickSize;
    };
    return {relativeId: index, x: x, y: y, size: this.regularBrickSize};
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
    return {relativeId: index, x: x, y: y, size: this.regularBrickSize};
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
    return {relativeId: index, x: x, y: y, size: this.metalBrickSize};
  }

  buildMetalBrickVertical(index){
    let parentX = this.parent.x;
    let parentY = this.parent.y;

    let x = parentX, y = parentY;
    if (index == 1) {
      x = parentX;
      y = parentY + this.metalBrickSize;
    } 
    return {relativeId: index, x: x, y: y, size: this.metalBrickSize};
  }

  buildBricks(){
    let bricks = [];
    for (let i = 0; i < this.bricksLength; i++) {
      bricks[i] = this.fn(i);
    };
    return bricks;
  }
}