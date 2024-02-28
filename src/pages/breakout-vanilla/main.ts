import "./style.css";
import { Ball } from "./lib/Ball";
import { Bricks } from "./lib/Bricks";
import { Paddle } from "./lib/Paddle";

const canvas = document.getElementById("myCanvas") as HTMLCanvasElement;
const ctx = canvas.getContext("2d");

const ball = new Ball(canvas);
const bricks = new Bricks();
const paddle = new Paddle(canvas);

// let lives = 3;

const draw = () => {
  if (!ctx) {
    return;
  }

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ball.draw(ctx);
  bricks.draw(ctx);
  paddle.draw(ctx);

  if (bricks.collisionDetection(ball.x, ball.y)) {
    alert("CONGRATULATIONS!");
  }

  if (!ball.update(paddle.x, paddle.width)) {
    alert("GAME OVER");
  }

  if (paddle.rightPressed) {
    paddle.moveRight();
  } else if (paddle.leftPressed) {
    paddle.moveLeft();
  }

  requestAnimationFrame(draw);
};

draw();

document.addEventListener("keydown", (e: KeyboardEvent) => {
  if (e.key === "Right" || e.key === "ArrowRight") {
    paddle.rightPressed = true;
  } else if (e.key === "Left" || e.key === "ArrowLeft") {
    paddle.leftPressed = true;
  }
});

document.addEventListener("keyup", (e: KeyboardEvent) => {
  if (e.key === "Right" || e.key === "ArrowRight") {
    paddle.rightPressed = false;
  } else if (e.key === "Left" || e.key === "ArrowLeft") {
    paddle.leftPressed = false;
  }
});

document.addEventListener("mousemove", (e: MouseEvent) => {
  const relativeX = e.clientX - canvas.offsetLeft;

  if (relativeX > 0 && relativeX < canvas.width) {
    paddle.update(relativeX);
  }
});
