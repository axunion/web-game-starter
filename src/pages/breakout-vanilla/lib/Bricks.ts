export class Bricks {
  #bricks: Record<string, number>[][] = [];
  #Width = 75;
  #Height = 20;
  #Padding = 10;
  #offsetTop = 30;
  #offsetLeft = 30;
  #columnCount = 5;
  #rowCount = 3;

  constructor() {
    for (let c = 0; c < this.#columnCount; c++) {
      this.#bricks[c] = [];

      for (let r = 0; r < this.#rowCount; r++) {
        this.#bricks[c][r] = { x: 0, y: 0, status: 1 };
      }
    }
  }

  draw(ctx: CanvasRenderingContext2D): void {
    for (let c = 0; c < this.#columnCount; c++) {
      for (let r = 0; r < this.#rowCount; r++) {
        if (this.#bricks[c][r].status === 1) {
          const x = c * (this.#Width + this.#Padding) + this.#offsetLeft;
          const y = r * (this.#Height + this.#Padding) + this.#offsetTop;

          this.#bricks[c][r].x = x;
          this.#bricks[c][r].y = y;

          ctx.beginPath();
          ctx.rect(x, y, this.#Width, this.#Height);
          ctx.fillStyle = "#0095DD";
          ctx.fill();
          ctx.closePath();
        }
      }
    }
  }

  collisionDetection(x: number, y: number): boolean {
    for (let c = 0; c < this.#columnCount; c++) {
      for (let r = 0; r < this.#rowCount; r++) {
        const b = this.#bricks[c][r];

        if (b.status === 1) {
          if (
            x > b.x &&
            x < b.x + this.#Width &&
            y > b.y &&
            y < b.y + this.#Height
          ) {
            b.status = 0;
            return true;
          }
        }
      }
    }

    return false;
  }
}
