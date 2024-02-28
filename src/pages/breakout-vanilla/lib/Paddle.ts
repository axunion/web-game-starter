export class Paddle {
  #canvas: HTMLCanvasElement;
  #width = 75;
  #height = 10;
  #color = "#0095dd";
  #x: number;
  #y: number;
  #motionWidth: number;
  #rightPressed = false;
  #leftPressed = false;

  constructor(canvas: HTMLCanvasElement) {
    this.#canvas = canvas;
    this.#x = (canvas.width - this.#width) / 2;
    this.#y = canvas.height - this.#height * 2;
    this.#motionWidth = this.#width / 10;
  }

  get width(): number {
    return this.#width;
  }

  get height(): number {
    return this.#height;
  }

  get x(): number {
    return this.#x;
  }

  get y(): number {
    return this.#y;
  }

  get leftPressed(): boolean {
    return this.#leftPressed;
  }

  set leftPressed(value: boolean) {
    this.#leftPressed = value;
  }

  get rightPressed(): boolean {
    return this.#rightPressed;
  }

  set rightPressed(value: boolean) {
    this.#rightPressed = value;
  }

  draw(ctx: CanvasRenderingContext2D): void {
    ctx.beginPath();
    ctx.rect(this.#x, this.#y, this.#width, this.#height);
    ctx.fillStyle = this.#color;
    ctx.fill();
    ctx.closePath();
  }

  update(width: number): void {
    if (!this.#isCollidingLeft() && !this.#isCollidingRight()) {
      this.#x -= width;
    }
  }

  moveLeft(): void {
    if (!this.#isCollidingLeft()) {
      this.#x -= this.#motionWidth;
    }
  }

  moveRight(): void {
    if (!this.#isCollidingRight()) {
      this.#x += this.#motionWidth;
    }
  }

  #isCollidingLeft(): boolean {
    return this.#x < this.#motionWidth * 2;
  }

  #isCollidingRight(): boolean {
    return this.#x > this.#canvas.width - this.#width - this.#motionWidth * 2;
  }
}
