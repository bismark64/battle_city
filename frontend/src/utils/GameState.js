export default class GameState {
  constructor(options={}){
    this.game = options.game;
    this.playing = false;
    this.win = false;
    this.over = false;
    this.score = 0;
    this.level = options.level || 1;
    this.lives = options.lives || 3;
  }

  get(){
    return {
      playing: this.playing,
      win: this.win,
      over: this.over,
      score: this.score,
      level: this.level,
      lives: this.lives
    }
  }

  // Setters
  start(startTime){
    this.playing = true;
    this.over = false;
    this.win = false;
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

  decreaseLives(){
    this.lives--;
    if (this.lives == 0) this.game.gameOver();
  }

}