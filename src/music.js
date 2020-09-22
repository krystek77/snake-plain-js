export default class Music {
  constructor(src, tempo, fps) {
    this.fps = fps;
    this.beatNumber = 0;
    this.src = src;
    this.tempo = tempo;
    // eslint-disable-next-line no-undef
    this.song = new Audio(src);
  }

  tick() {
    if (this.beatNumber === 0) {
      this.song.play();
      this.beatNumber = Math.ceil(this.tempo * this.fps);
    } else {
      // eslint-disable-next-line no-plusplus
      this.beatNumber--;
    }
  }

  stop() {
    this.song.pause();
  }
}
