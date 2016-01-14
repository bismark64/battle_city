import BrickConstructor from './brick/BrickConstructor';
import MetalConstructor from './metal/MetalConstructor';

export default class Constructor {
  constructor(type, orientation, position){
    this.type = type;
    this.orientation = orientation;
    this.parentPosition = position;
  }

  build(){
    switch (this.type) {
      case "brick":
        return BrickConstructor[this.orientation](this.parentPosition);
        break;
      case "metal":
        return MetalConstructor[this.orientation](this.parentPosition);
        break;
      default:
        return BrickConstructor[this.orientation](this.parentPosition);
        break;
    }
  }
}