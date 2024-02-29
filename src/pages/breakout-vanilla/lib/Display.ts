import { Ball } from "./Ball";
import { Bricks } from "./Bricks";
import { Paddle } from "./Paddle";

export class Display {
  #canvas: HTMLCanvasElement;
  #context: CanvasRenderingContext2D;
  #ball: Ball;
  #bricks: Bricks;
  #paddle: Paddle;
  #lives = 3;

  constructor(canvas: HTMLCanvasElement) {
    this.#canvas = canvas;
    this.#context = this.#canvas.getContext("2d") as CanvasRenderingContext2D;
    this.#ball = new Ball(canvas);
    this.#bricks = new Bricks();
    this.#paddle = new Paddle(canvas);
  }

  #clear() {
    this.#context.clearRect(0, 0, this.#canvas.width, this.#canvas.height);
  }

  #drawLives() {
    this.#context.font = "16px Arial";
    this.#context.fillStyle = "#0095dd";
    this.#context.fillText(
      `Lives: ${this.#lives}`,
      this.#canvas.width - 65,
      20,
    );
  }

  #drawScore() {
    this.#context.font = "16px Arial";
    this.#context.fillStyle = "#0095dd";
    this.#context.fillText(`Score: ${this.#bricks.score}`, 8, 20);
  }

  draw() {
    this.#clear();
    this.#drawLives();
    this.#drawScore();
    this.#ball.draw(this.#context);
    this.#bricks.draw(this.#context);
    this.#paddle.draw(this.#context);

    if (this.#bricks.collisionDetection(this.#ball.x, this.#ball.y)) {
      alert("CONGRATULATIONS!");
    }

    if (!this.#ball.update(this.#paddle.x, this.#paddle.width)) {
      this.#lives--;

      if (this.#lives > 0) {
        this.#ball.init();
      } else {
        alert("GAME OVER");
        document.location.reload();
      }
    }

    if (this.#paddle.rightPressed) {
      this.#paddle.moveRight();
    } else if (this.#paddle.leftPressed) {
      this.#paddle.moveLeft();
    }

    requestAnimationFrame(this.draw.bind(this));
  }

  setLeftPressed(value: boolean) {
    this.#paddle.leftPressed = value;
  }

  setRightPressed(value: boolean) {
    this.#paddle.rightPressed = value;
  }

  updatePaddleWidth(width: number) {
    this.#paddle.update(width);
  }
}
