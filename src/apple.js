export default class Apple {
  constructor(canvas, coordiantes, array) {
    this.canvas = canvas;
    this.coordiantes = coordiantes;
    this.array = array;
    this.position = this.random();
  }

  random() {
    let x = 0;
    let y = 0;
    do {
      x = Math.floor(Math.random() * this.canvas.col);
      y = Math.floor(Math.random() * this.canvas.row);
    } while (this.array[y][x] === 2 || this.array[y][x] === 1);
    return {
      x,
      y,
    };
  }

  draw() {
    const xCoord = this.coordiantes[this.position.y][this.position.x].x;
    const yCoord = this.coordiantes[this.position.y][this.position.x].y;
    this.array[this.position.y][this.position.x] = 3;
    this.canvas.ctx.fillStyle = 'red';
    this.canvas.ctx.beginPath();
    this.canvas.ctx.arc(
      xCoord + Math.floor(this.canvas.size / 2),
      yCoord + Math.floor(this.canvas.size / 2),
      this.canvas.size / 2.5,
      0,
      2 * Math.PI,
      false,
    );
    this.canvas.ctx.fill();
  }
}
