export default class Snake {
  constructor(canvas, coordinates, array) {
    this.canvas = canvas;
    this.coordinates = coordinates;
    this.array = array;
    this.body = [
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
    this.directions = {
      LEFT: { x: -1, y: 0 },
      RIGHT: { x: 1, y: 0 },
      DOWN: { x: 0, y: 1 },
      UP: { x: 0, y: -1 },
    };
    this.dir = 'RIGHT';
    this.dead = false;
  }

  move() {
    const body = [...this.body];
    const tail = body.slice(0, -1);
    const head = { ...tail[0] };

    switch (this.dir) {
      case 'RIGHT':
        head.x += this.directions.RIGHT.x;
        break;
      case 'LEFT':
        head.x += this.directions.LEFT.x;
        break;
      case 'DOWN':
        head.y += this.directions.DOWN.y;
        break;
      case 'UP':
        head.y += this.directions.UP.y;
        break;
      default:
        break;
    }
    this.body = [head, ...tail];
  }

  draw() {
    this.body.forEach((ceil, index) => {
      const xCoord = this.coordinates[ceil.y][ceil.x].x;
      const yCoord = this.coordinates[ceil.y][ceil.x].y;
      this.array[ceil.y][ceil.x] = index === 0 ? 2 : 1;
      this.canvas.ctx.fillStyle = index === 0 ? 'darkgreen' : 'green';
      this.canvas.ctx.strokeStyle = 'darkgreen';
      this.canvas.ctx.fillRect(
        xCoord,
        yCoord,
        this.canvas.size,
        this.canvas.size,
      );
      this.canvas.ctx.strokeRect(
        xCoord,
        yCoord,
        this.canvas.size,
        this.canvas.size,
      );
    });
  }
}
