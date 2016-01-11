import BrickConstructor from './brick/BrickConstructor';
import MetalConstructor from './metal/MetalConstructor';

export default class Constructor {
  constructor(type, orientation){
    this.type = type;
    this.orientation = orientation;
  }

  build(){
    switch (this.type) {
      case "brick":
        return BrickConstructor[this.orientation]();
        break;
      case "metal":
        return MetalConstructor[this.orientation]();
        break;
      default:
        return BrickConstructor[this.orientation]();
        break;
    }
  }
}