export class Paddle {
  #canvas: HTMLCanvasElement;
  #width: number;
  #height: number;
  #color: string;
  #x: number;
  #y: number;
  #motionWidth: number;

  constructor(
    canvas: HTMLCanvasElement,
    width = 75,
    height = 10,
    color = "#0095dd",
  ) {
    this.#canvas = canvas;
    this.#width = width;
    this.#height = height;
    this.#color = color;
    this.#x = (canvas.width - width) / 2;
    this.#y = canvas.height - height * 2;
    this.#motionWidth = width / 10;
  }

  #isCollidingLeft(): boolean {
    return this.#x < this.#width;
  }

  #isCollidingRight(): boolean {
    return this.#x > this.#canvas.width - this.#width;
  }

  draw(ctx: CanvasRenderingContext2D): void {
    ctx.beginPath();
    ctx.rect(this.#x, this.#y, this.#width, this.#height);
    ctx.fillStyle = this.#color;
    ctx.fill();
    ctx.closePath();
  }

  updateLeft(): void {
    if (!this.#isCollidingLeft()) {
      this.#x -= this.#motionWidth;
    }
  }

  updateRight(): void {
    if (!this.#isCollidingRight()) {
      this.#x += this.#motionWidth;
    }
  }
}
