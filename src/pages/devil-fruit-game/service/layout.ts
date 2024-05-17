import { Bodies } from "matter-js";
import { BOX_HEIGHT, BOX_MARGIN, BOX_WIDTH } from "../constants/config";

const options = {
  isStatic: true,
};

export const ground = Bodies.rectangle(
  BOX_WIDTH / 2,
  BOX_HEIGHT,
  BOX_WIDTH,
  BOX_MARGIN,
  options,
);

export const leftWall = Bodies.rectangle(
  0,
  BOX_HEIGHT / 2,
  BOX_MARGIN,
  BOX_HEIGHT,
  options,
);

export const rightWall = Bodies.rectangle(
  BOX_WIDTH,
  BOX_HEIGHT / 2,
  BOX_MARGIN,
  BOX_HEIGHT,
  options,
);
