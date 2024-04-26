import { Bodies, Composite, Engine, Events, Render, Runner } from "matter-js";

const WIDTH = 400;
const HEIGHT = 640;
const WALL_T = 8;

export class DevilFruitGame {
  #fruitsBox: HTMLElement;
  #engine: Engine;
  #render: Render;
  #runner: Runner;

  constructor(fruitsBox: HTMLElement) {
    this.#fruitsBox = fruitsBox;
    this.#engine = Engine.create();
    this.#runner = Runner.create();

    this.#render = Render.create({
      element: fruitsBox,
      engine: this.#engine,
      options: {
        width: WIDTH,
        height: HEIGHT,
      },
    });

    Render.run(this.#render);
    Runner.run(this.#runner, this.#engine);

    Events.on(this.#engine, "collisionStart", this.#collision.bind(this));
  }

  init() {
    Composite.clear(this.#engine.world, false);
    this.#createWall();

    this.#fruitsBox.addEventListener("click", this.#createFruit.bind(this));
  }

  #createWall() {
    const ground = Bodies.rectangle(
      WIDTH / 2,
      HEIGHT - WALL_T / 2,
      WIDTH,
      WALL_T,
      { isStatic: true, label: "ground" },
    );

    const leftWall = Bodies.rectangle(WALL_T / 2, HEIGHT / 2, WALL_T, HEIGHT, {
      isStatic: true,
      label: "leftWall",
    });

    const rightWall = Bodies.rectangle(
      WIDTH - WALL_T / 2,
      HEIGHT / 2,
      WALL_T,
      HEIGHT,
      { isStatic: true, label: "rightWall" },
    );

    Composite.add(this.#engine.world, [ground, leftWall, rightWall]);
  }

  #createFruit(event: MouseEvent) {
    const { clientX, clientY } = event;
    const { left, top } = this.#fruitsBox.getBoundingClientRect();
    const x = clientX - left;
    const y = clientY - top;

    const fruit = Bodies.circle(x, y, 20, {
      restitution: 0.8,
      friction: 0.1,
      label: "fruit_0",
    });

    Composite.add(this.#engine.world, fruit);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  #collision({ pairs }: { pairs: any[] }) {
    for (const pair of pairs) {
      const { bodyA, bodyB } = pair;

      if (bodyA.label === bodyB.label && bodyA.label.startsWith("fruit_")) {
        const currentLevel = parseInt(bodyA.label.substring(6));
        const newLevel = currentLevel + 1;
        const newX = (bodyA.position.x + bodyB.position.x) / 2;
        const newY = (bodyA.position.y + bodyB.position.y) / 2;
        const newRadius = newLevel * 10 + 20;
        const newBubble = Bodies.circle(newX, newY, newRadius, {
          label: "fruit_" + newLevel,
        });

        Composite.remove(this.#engine.world, [bodyA, bodyB]);
        Composite.add(this.#engine.world, [newBubble]);
      }
    }
  }
}
