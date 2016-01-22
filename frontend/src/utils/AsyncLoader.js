import StoreActions from '../actions/StoreActions';

class LevelLoader {
  constructor(level){
    this.url = `http://localhost:3000/api/v1/levels/${level}`;
  }

  load(){
    fetch(this.url)
    .then(function(response) {
      return response.json()
    }).then(function(json) {
      StoreActions.loadedMap(json);
    }).catch(function(ex) {
      StoreActions.loadedMap(null);
    });
  }
}

export default{
  loadMap(level){
    new LevelLoader(level).load();
  }
}