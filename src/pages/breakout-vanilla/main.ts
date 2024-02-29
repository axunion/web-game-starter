import "./style.css";
import { Display } from "./lib/Display";

const canvas = document.getElementById("myCanvas") as HTMLCanvasElement;
const display = new Display(canvas);

display.draw();

document.addEventListener("keydown", (e: KeyboardEvent) => {
  if (e.key === "Right" || e.key === "ArrowRight") {
    display.setRightPressed(true);
  } else if (e.key === "Left" || e.key === "ArrowLeft") {
    display.setLeftPressed(true);
  }
});

document.addEventListener("keyup", (e: KeyboardEvent) => {
  if (e.key === "Right" || e.key === "ArrowRight") {
    display.setRightPressed(false);
  } else if (e.key === "Left" || e.key === "ArrowLeft") {
    display.setLeftPressed(false);
  }
});

document.addEventListener("mousemove", (e: MouseEvent) => {
  const relativeX = e.clientX - canvas.offsetLeft;

  if (relativeX > 0 && relativeX < canvas.width) {
    display.updatePaddleWidth(relativeX);
  }
});
