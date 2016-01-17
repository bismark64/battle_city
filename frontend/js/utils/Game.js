export default class Game {
  constructor(options={}){
    this.playing = false;
    this.score = 0;
    this.level = options.level || 1;
    this.lives = options.lives || 3;

  }

  start(startTime){
    this.playing = true;
  }

  togglePause(){
    this.playing = !this.playing;
  }

  over(data){
    this.playing = false;
  }

  isPlaying(){
    return this.playing;
  }

  getScore(){
    return this.score;
  }

  getLives(){
    return this.lives;
  }
}