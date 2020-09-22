/* eslint-disable no-undef */
/* eslint-disable class-methods-use-this */
import './css/index.scss';
import Keyboard from './keyboard';
import Canvas from './board';
import Snake from './snake';
import Apple from './apple';
import Music from './music';
import fxEat from './assets/sounds/snakeatt.mp3';
import fxHit from './assets/sounds/snakehit2.mp3';
import fxMusic from './assets/sounds/rattlesnakerattle.mp3';

class Game {
  constructor() {
    this.SOUND_ON = true;
    this.GAME_LIFES = 5;
    this.TEXT_SIZE = 32; // size of text in pisxels
    this.TEXT_FADE = 2; // duration of fade in text in seconds
    this.tempo = 1; // time step how often to play music in seconds
    this.amountOfApple = 0;
    this.text = '';
    this.textAlpha = 0;
    this.lifes = this.GAME_LIFES;
    this.level = 0;
    this.score = 0;
    this.canvas = new Canvas();
    this.boardCoordinates = this.createBoardCoordiante();
    this.boardArray = this.createBoardArray();
    this.FPS = this.level * 2 + 2;
    window.requestAnimationFrame(this.gameLoop(0));
    this.snake = new Snake(this.canvas, this.boardCoordinates, this.boardArray);
    this.apple = new Apple(this.canvas, this.boardCoordinates, this.boardArray);
    this.keyboard = new Keyboard(this.snake);
    this.fxEatSnake = new Audio(fxEat);
    this.fxHitSnake = new Audio(fxHit);
    this.fxMusic = new Music(fxMusic, this.tempo, this.FPS);
    this.newGame();
  }

  newLevel() {
    this.text = `LEVEL: ${this.level + 1}`;
    this.textAlpha = 1.0;
    this.resetSnake();
  }

  newGame() {
    this.amountOfApple = 0;
    this.level = 0;
    this.lifes = this.GAME_LIFES;
    this.score = 0;
    this.snake.body = [
      {
        x: Math.floor(this.canvas.col / 2),
        y: Math.floor(this.canvas.row / 2),
      },
      {
        x: Math.floor(this.canvas.col / 2 - 1),
        y: Math.floor(this.canvas.row / 2),
      },
      {
        x: Math.floor(this.canvas.col / 2 - 2),
        y: Math.floor(this.canvas.row / 2),
      },
      {
        x: Math.floor(this.canvas.col / 2 - 3),
        y: Math.floor(this.canvas.row / 2),
      },
    ];
    this.snake.dead = false;
    this.snake.dir = 'RIGHT';
    this.newLevel();
  }

  randomDirection(object) {
    const directions = Object.keys(object);
    const randomIndexDirection = Math.floor(Math.random() * directions.length);
    return directions[randomIndexDirection];
  }

  checkCollisionWithApple() {
    const xSnake = this.snake.body[0].x;
    const ySnake = this.snake.body[0].y;
    this.boardArray.forEach((row) => {
      row.forEach(() => {
        if (this.boardArray[ySnake][xSnake] === 3) {
          const lastCeilCoordinates = [...this.snake.body].pop();
          this.snake.body = [...this.snake.body, lastCeilCoordinates];
          this.apple.position = this.apple.random();
          this.boardArray[ySnake][xSnake] = 2;
          this.score += (this.level + 1) * 10;
          this.amountOfApple += 1;
          this.level =
            this.amountOfApple % 3 === 0 ? this.level + 1 : this.level;
          if (this.amountOfApple % 3 === 0) {
            this.newLevel();
          }
          if (this.SOUND_ON) {
            this.fxEatSnake.play();
          }
        }
      });
    });
  }

  clearBoardArray() {
    return this.boardArray.forEach((row) => {
      row.fill(0);
    });
  }

  createBoardArray() {
    return [...Array(this.canvas.row)].map(() => {
      return Array(this.canvas.col).fill(0);
    });
  }

  createBoardCoordiante() {
    const array = [];
    for (let r = 0; r < this.canvas.row; r += 1) {
      array.push([]);
      for (let c = 0; c < this.canvas.col; c += 1) {
        array[r].push({
          x: c * this.canvas.size,
          y: r * this.canvas.size,
        });
      }
    }
    return array;
  }

  gameOver() {
    this.snake.dead = true;
    this.text = 'GAME OVER';
    this.textAlpha = 1.0;
    this.fxMusic.stop();
  }

  isCollideWithYourself() {
    const { x, y } = this.snake.body[0];
    if (this.boardArray[y][x] === 1) {
      console.log('collide');
      if (this.SOUND_ON) {
        this.fxHitSnake.play();
      }
      return true;
    }
    return false;
  }

  isCollideEdge() {
    const head = this.snake.body[0];
    if (
      (head.x === 0 && this.snake.dir === 'LEFT') ||
      (head.x === this.canvas.col - 1 && this.snake.dir === 'RIGHT') ||
      (head.y === 0 && this.snake.dir === 'UP') ||
      (head.y === this.canvas.row - 1 && this.snake.dir === 'DOWN')
    ) {
      if (this.SOUND_ON) {
        this.fxHitSnake.play();
      }
      return true;
    }
    return false;
  }

  resetSnake() {
    // reset snake

    // get length of snake
    const currentLengthSnake = this.snake.body.length;

    // create head
    const head = {
      x: Math.floor(this.canvas.col / 2),
      y: Math.floor(this.canvas.row / 2),
    };

    // random direction
    const randomDirection = this.randomDirection(this.snake.directions);

    // create tail
    const tail = [];
    for (let t = 1; t < currentLengthSnake; t += 1) {
      switch (randomDirection) {
        case 'LEFT':
          this.snake.dir = 'LEFT';
          tail.push({
            x: Math.floor(this.canvas.col / 2 + t),
            y: Math.floor(this.canvas.row / 2),
          });
          this.keyboard.keysMap.RIGHT = true;
          this.keyboard.keysMap.UP = false;
          this.keyboard.keysMap.DOWN = false;
          break;
        case 'RIGHT':
          this.snake.dir = 'RIGHT';
          tail.push({
            x: Math.floor(this.canvas.col / 2 - t),
            y: Math.floor(this.canvas.row / 2),
          });
          this.keyboard.keysMap.LEFT = true;
          this.keyboard.keysMap.UP = false;
          this.keyboard.keysMap.DOWN = false;
          break;
        case 'UP':
          this.snake.dir = 'UP';
          tail.push({
            x: Math.floor(this.canvas.col / 2),
            y: Math.floor(this.canvas.row / 2 + t),
          });
          this.keyboard.keysMap.DOWN = true;
          this.keyboard.keysMap.RIGHT = false;
          this.keyboard.keysMap.LEFT = false;
          break;
        case 'DOWN':
          this.snake.dir = 'DOWN';
          tail.push({
            x: Math.floor(this.canvas.col / 2),
            y: Math.floor(this.canvas.row / 2 - t),
          });
          this.keyboard.keysMap.UP = true;
          this.keyboard.keysMap.RIGHT = false;
          this.keyboard.keysMap.LEFT = false;
          break;
        default:
          break;
      }
    }
    this.snake.body = [head, ...tail];
  }

  update() {
    /**
     * TODO:
     * 1. clear canvas
     * 2. draw grid
     * 3. clear board
     * 4. check collision with edges and apple
     * 5. move
     * 6. draw all
     * 7. draw score
     * 8. draw lifes
     * 9. draw legends
     *
     */

    // clear canvas
    this.canvas.clearCanvas();
    this.canvas.drawGrid();
    this.clearBoardArray();

    if (!this.snake.dead) {
      if (this.SOUND_ON) {
        this.fxMusic.tick();
      }

      if (this.isCollideEdge()) {
        // less lifes
        this.lifes -= 1;
        if (this.lifes === 0) {
          this.gameOver();
        } else {
          this.resetSnake();
          this.apple.position = this.apple.random();
        }
      } else {
        this.snake.move();
      }
      this.snake.draw();
      this.apple.draw();
      if (this.isCollideWithYourself()) {
        // less lifes
        this.lifes -= 1;
        if (this.lifes === 0) {
          this.gameOver();
        } else {
          this.resetSnake();
          this.apple.position = this.apple.random();
        }
      }
      // check collision with apple
      this.checkCollisionWithApple();
    }
    // draw text - level /  game over
    if (this.textAlpha >= 0) {
      this.canvas.ctx.fillStyle = `rgba(255,255,255,${this.textAlpha})`;
      this.canvas.ctx.font = `bold ${this.TEXT_SIZE * 2}px Ubuntu`;
      this.canvas.ctx.textBaseline = 'middle';
      this.canvas.ctx.textAlign = 'center';
      this.canvas.ctx.fillText(
        this.text,
        Math.floor((this.canvas.col * this.canvas.size) / 2),
        Math.floor((this.canvas.row * this.canvas.size) / 1.5),
      );
      this.textAlpha -= 1 / (this.TEXT_FADE * this.FPS);
    } else if (this.snake.dead) {
      this.newGame();
    }

    // draw score
    this.canvas.ctx.fillStyle = 'white';
    this.canvas.ctx.textAlign = 'right';
    this.canvas.ctx.font = `${this.TEXT_SIZE}px Arial`;
    this.canvas.ctx.fillText(
      this.score,
      this.canvas.col * this.canvas.size - this.canvas.size,
      this.canvas.size * 1,
    );
    // draw apples
    this.canvas.ctx.fillStyle = 'red';
    this.canvas.ctx.textAlign = 'right';
    this.canvas.ctx.font = `${this.TEXT_SIZE}px Arial`;
    this.canvas.ctx.textAlign = 'right';
    this.canvas.ctx.fillText(
      this.amountOfApple,
      this.canvas.col * this.canvas.size - this.canvas.size * 1.5,
      this.canvas.size * 2.5,
    );
    this.canvas.ctx.strokeStyle = 'darkred';
    this.canvas.ctx.fillStyle = 'red';
    this.canvas.ctx.beginPath();
    this.canvas.ctx.arc(
      this.canvas.col * this.canvas.size - this.canvas.size,
      this.canvas.size * 2.5,
      this.canvas.size / 2.5,
      0,
      2 * Math.PI,
      false,
    );
    this.canvas.ctx.fill();
    this.canvas.ctx.stroke();

    // draw lifes
    if (this.lifes === 0) {
      this.canvas.ctx.fillStyle = 'green';
      this.canvas.ctx.textAlign = 'left';
      this.canvas.ctx.textBaseline = 'middle';
      this.canvas.ctx.font = `bold ${this.TEXT_SIZE / 2}px Ubuntu`;
      this.canvas.ctx.fillText(
        'You are dead',
        this.canvas.size,
        this.canvas.size,
      );
    } else {
      this.canvas.ctx.strokeStyle = 'darkgreen';
      for (let life = 0; life < this.lifes; life += 1) {
        this.canvas.ctx.fillStyle =
          life === this.lifes - 1 && this.isCollideEdge() ? 'red' : 'yellow';
        this.canvas.ctx.beginPath();
        this.canvas.ctx.arc(
          life * this.canvas.size * 1 + this.canvas.size,
          this.canvas.size,
          this.canvas.size / 2.5,
          0,
          2 * Math.PI,
          false,
        );
        this.canvas.ctx.fill();
        this.canvas.ctx.stroke();
      }
    }

    // draw legends
    this.canvas.ctx.fillStyle = 'white';
    this.canvas.ctx.textAlign = 'left';
    this.canvas.ctx.textBaseline = 'middle';
    this.canvas.ctx.font = `lighter ${this.TEXT_SIZE / 2.5}px Ubuntu`;
    this.canvas.ctx.fillText(
      'LEFT: a, Left Arrow ',
      this.canvas.size * 1,
      this.canvas.row * this.canvas.size - this.TEXT_SIZE * 2.5,
    );
    this.canvas.ctx.fillText(
      'RIGHT: d, Right Arrow ',
      this.canvas.size * 1,
      this.canvas.row * this.canvas.size - this.TEXT_SIZE * 2,
    );
    this.canvas.ctx.fillText(
      'UP: w, Up Arrow ',
      this.canvas.size * 1,
      this.canvas.row * this.canvas.size - this.TEXT_SIZE * 1.5,
    );
    this.canvas.ctx.fillText(
      'DOWN: s, Down Arrow ',
      this.canvas.size * 1,
      this.canvas.row * this.canvas.size - this.TEXT_SIZE * 1,
    );
  }

  gameLoop(t1) {
    return (t2) => {
      if (t2 - t1 > 1000 / this.FPS) {
        window.requestAnimationFrame(this.gameLoop(t2));
        this.update();
      } else {
        window.requestAnimationFrame(this.gameLoop(t1));
      }
    };
  }
}
// eslint-disable-next-line no-unused-vars
const game = new Game();
