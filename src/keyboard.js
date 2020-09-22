/* eslint-disable class-methods-use-this */
export default class Keyboard {
  constructor(snake) {
    this.keysMap = { RIGHT: true, LEFT: false, UP: false, DOWN: false };
    this.snake = snake;
    window.addEventListener('keydown', (e) => this.keyPressed(e));
    window.addEventListener('keyup', (e) => this.keyReleased(e));
  }

  keyPressed(e) {
    const key = e.keyCode;
    switch (key) {
      // move right
      case 39:
      case 68:
        if (!this.keysMap.LEFT) {
          this.snake.dir = 'RIGHT';
          this.keysMap.RIGHT = true;
          this.keysMap.UP = false;
          this.keysMap.DOWN = false;
        }
        break;
      // move left
      case 37:
      case 65:
        if (!this.keysMap.RIGHT) {
          this.snake.dir = 'LEFT';
          this.keysMap.LEFT = true;
          this.keysMap.UP = false;
          this.keysMap.DOWN = false;
        }
        break;
      // move down
      case 40:
      case 83:
        if (!this.keysMap.UP) {
          this.snake.dir = 'DOWN';
          this.keysMap.DOWN = true;
          this.keysMap.RIGHT = false;
          this.keysMap.LEFT = false;
        }
        break;
      // move up
      case 38:
      case 87:
        if (!this.keysMap.DOWN) {
          this.snake.dir = 'UP';
          this.keysMap.UP = true;
          this.keysMap.RIGHT = false;
          this.keysMap.LEFT = false;
        }
        break;
      default:
        break;
    }
  }

  keyReleased(e) {
    const key = e.keyCode;
    switch (key) {
      // stop moveing right
      case 39:
      case 68:
        break;

      default:
        break;
    }
  }
}
