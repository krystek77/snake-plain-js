/* eslint-disable class-methods-use-this */
export default class Canvas {
  constructor() {
    this.row = 20;
    this.col = 30;
    this.size = 25;
    this.canvas = this.createCanvas();
    this.ctx = this.canvas.getContext('2d');
    this.clearCanvas();
    this.drawGrid();
  }

  createCanvas() {
    /**
     * @type {HTMLCanvasElement}
     */
    const canvas = document.createElement('canvas');
    canvas.id = 'canvas';
    canvas.width = this.size * this.col;
    canvas.height = this.size * this.row;
    document.body.appendChild(canvas);
    return canvas;
  }

  clearCanvas() {
    this.ctx.fillStyle = 'rgba(0,0,0,1)';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
  }

  drawGrid() {
    this.ctx.strokeStyle = 'rgba(255,255,255,0.4)';
    this.lineWidth = 1;
    for (let c = 1; c < this.col; c += 1) {
      this.ctx.beginPath();
      this.ctx.moveTo(this.size * c, 0);
      this.ctx.lineTo(this.size * c, this.canvas.height);
      this.ctx.stroke();
    }
    for (let r = 1; r < this.row; r += 1) {
      this.ctx.beginPath();
      this.ctx.moveTo(0, this.size * r);
      this.ctx.lineTo(this.canvas.width, this.size * r);
      this.ctx.stroke();
    }
  }
}
