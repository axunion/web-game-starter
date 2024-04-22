import {
  Bodies,
  Composite,
  Engine,
  Mouse,
  MouseConstraint,
  Render,
  Runner,
} from "matter-js";

// target element
const targetElement = document.body;

// create an engine
const engine = Engine.create();

// create a renderer
const render = Render.create({
  element: targetElement,
  engine: engine,
});

// create a mouse
const mouse = Mouse.create(targetElement);
const mouseConstraint = MouseConstraint.create(engine, {
  mouse: mouse,
  constraint: {
    render: {
      visible: false,
    },
  },
});

Composite.add(engine.world, mouseConstraint);
render.mouse = mouse;

// run the renderer
Render.run(render);

// create runner
const runner = Runner.create();

// run the engine
Runner.run(runner, engine);

// 静止オブジェクト（空中の床と地面）
const floor = Bodies.rectangle(400, 200, 500, 30, { isStatic: true });
const ground = Bodies.rectangle(400, 585, 800, 30, { isStatic: true });

// 可動オブジェクト（正方形、円、三角形）
const square = Bodies.rectangle(
  floor.bounds.min.x + 50,
  floor.bounds.max.y - 50,
  50,
  50,
);
const circle = Bodies.circle(floor.position.x, floor.bounds.max.y - 50, 50);
const triangle = Bodies.polygon(
  floor.bounds.max.x - 50,
  floor.bounds.max.y - 50,
  3,
  50,
);

Composite.add(engine.world, [floor, ground, square, circle, triangle]);
