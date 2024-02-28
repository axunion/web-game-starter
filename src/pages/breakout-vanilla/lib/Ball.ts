export class Ball {
  #canvas: HTMLCanvasElement;
  #x: number;
  #y: number;
  #dx: number;
  #dy: number;
  #radius: number;
  #color: string;

  constructor(
    canvas: HTMLCanvasElement,
    x = 0,
    y = 0,
    dx = 2,
    dy = -2,
    radius = 10,
    color = "#0095dd",
  ) {
    this.#canvas = canvas;
    this.#x = x;
    this.#y = y;
    this.#dx = dx;
    this.#dy = dy;
    this.#radius = radius;
    this.#color = color;
  }

  #isCollidingLeft(): boolean {
    return this.#x + this.#dx < this.#radius;
  }

  #isCollidingRight(): boolean {
    return this.#x + this.#dx > this.#canvas.width - this.#radius;
  }

  #isCollidingTop(): boolean {
    return this.#y + this.#dy < this.#radius;
  }

  #isCollidingBottom(): boolean {
    return this.#y + this.#dy > this.#canvas.height - this.#radius;
  }

  draw(ctx: CanvasRenderingContext2D): void {
    ctx.beginPath();
    ctx.arc(this.#x, this.#y, this.#radius, 0, Math.PI * 2);
    ctx.fillStyle = this.#color;
    ctx.fill();
    ctx.closePath();
  }

  update(paddleX: number, paddleWidth: number): boolean {
    this.#x += this.#dx;
    this.#y += this.#dy;

    if (this.#isCollidingLeft() || this.#isCollidingRight()) {
      this.#dx = -this.#dx;
    }

    if (this.#isCollidingTop()) {
      this.#dy = -this.#dy;
    } else if (this.#isCollidingBottom()) {
      if (this.#x > paddleX && this.#x < paddleX + paddleWidth) {
        this.#dy = -this.#dy;
      } else {
        return false;
      }
    }

    return true;
  }

  reset(canvas: HTMLCanvasElement): void {
    this.#x = canvas.width / 2;
    this.#y = canvas.height - 30;
    this.#dx = 2;
    this.#dy = -2;
  }
}
