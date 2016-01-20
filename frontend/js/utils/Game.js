export default class Game {
  constructor(options={}){
    this.dataStore = options.dataStore;
    this.playing = false;
    this.win = false;
    this.over = false;
    this.score = 0;
    this.level = options.level || 1;
    this.lives = options.lives || 3;
  }

  // Setters
  start(startTime){
    this.playing = true;
    this.over = false;
    this.score = 0;
    this.lives = 3;
  }

  togglePause(){
    this.playing = !this.playing;
  }

  gameOver(){
    this.over = true;
  }

  gameWin(){
    this.playing = false;
    this.win = true;
  }

  updateScore(points){
    this.score += points;
  }

  // Getters
  isPlaying(){
    return this.playing;
  }

  isOver(){
    return this.over;
  }

  hasWin(){
    return this.win;
  }

  getScore(){
    return this.score;
  }

  getLives(){
    return this.lives;
  }

  getLevel(){
    return this.level;
  }
}