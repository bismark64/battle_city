import Immutable, {List, Range} from 'immutable';
import _ from 'lodash';
import SAT from 'sat';

let _obstaclesRects = [];

const storeRects = (rects) =>{
  //let obstacleBox = new SAT.Box(new SAT.Vector(rects.bottom, rects.left), rects.width, rects.height).toPolygon();
  //_obstaclesRects.push(obstacleBox);
  _obstaclesRects.push(rects);
}

const getRects = () => {
  return _obstaclesRects;
}

export default{ storeRects, getRects }