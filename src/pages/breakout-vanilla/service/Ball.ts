export class Ball {
  #canvas: HTMLCanvasElement;
  #x = 0;
  #y = 0;
  #dx = 0;
  #dy = 0;
  #radius = 10;
  #color = "#0095dd";

  constructor(canvas: HTMLCanvasElement) {
    this.#canvas = canvas;
    this.#radius = 10;
    this.init();
  }

  get x(): number {
    return this.#x;
  }

  get y(): number {
    return this.#y;
  }

  init(): void {
    this.#x = this.#canvas.width / 2;
    this.#y = this.#canvas.height - 30;
    this.#dx = 2;
    this.#dy = -2;
  }

  draw(ctx: CanvasRenderingContext2D): void {
    ctx.beginPath();
    ctx.arc(this.#x, this.#y, this.#radius, 0, Math.PI * 2);
    ctx.fillStyle = this.#color;
    ctx.fill();
    ctx.closePath();
  }

  update(x: number, width: number): boolean {
    this.#x += this.#dx;
    this.#y += this.#dy;

    if (this.#isCollidingLeft() || this.#isCollidingRight()) {
      this.#dx = -this.#dx;
    }

    if (this.#isCollidingTop()) {
      this.#dy = -this.#dy;
    } else if (this.#isCollidingBottom()) {
      if (this.#x > x && this.#x < x + width) {
        this.#dy = -this.#dy;
      } else {
        return false;
      }
    }

    return true;
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
    return this.#y + this.#dy > this.#canvas.height;
  }
}
