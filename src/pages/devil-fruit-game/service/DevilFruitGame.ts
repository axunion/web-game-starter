import { Bodies, Composite, Engine, Events, Render, Runner } from "matter-js";
import { BOX_HEIGHT, BOX_MARGIN, BOX_WIDTH } from "../constants/config";
import {
  createDevilFruit,
  createRandomDevilFruit,
  getDevilFruitLevel,
  isDevilFruit,
} from "./devilFruit";

export class DevilFruitGame {
  #fruitsBox: HTMLElement;
  #engine: Engine;
  #render: Render;
  #runner: Runner;

  constructor(fruitsBox: HTMLElement) {
    this.#fruitsBox = fruitsBox;
    this.#engine = Engine.create({
      positionIterations: 10,
      velocityIterations: 8,
      constraintIterations: 2,
    });
    this.#runner = Runner.create();
    this.#render = Render.create({
      element: fruitsBox,
      engine: this.#engine,
      options: {
        width: BOX_WIDTH,
        height: BOX_HEIGHT,
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
      BOX_WIDTH / 2,
      BOX_HEIGHT - BOX_MARGIN / 2,
      BOX_WIDTH,
      BOX_MARGIN,
      { isStatic: true },
    );

    const leftWall = Bodies.rectangle(
      BOX_MARGIN / 2,
      BOX_HEIGHT / 2,
      BOX_MARGIN,
      BOX_HEIGHT,
      { isStatic: true },
    );

    const rightWall = Bodies.rectangle(
      BOX_WIDTH - BOX_MARGIN / 2,
      BOX_HEIGHT / 2,
      BOX_MARGIN,
      BOX_HEIGHT,
      { isStatic: true },
    );

    Composite.add(this.#engine.world, [ground, leftWall, rightWall]);
  }

  #createFruit(event: MouseEvent) {
    const { clientX } = event;
    const { left } = this.#fruitsBox.getBoundingClientRect();
    const x = clientX - left;
    const y = 0;
    const devilFruit = createRandomDevilFruit(x, y);

    if (devilFruit) {
      Composite.add(this.#engine.world, [devilFruit]);
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  #collision({ pairs }: { pairs: any[] }) {
    for (const pair of pairs) {
      const { bodyA, bodyB } = pair;

      if (bodyA.label === bodyB.label && isDevilFruit(bodyA.label)) {
        const newLevel = getDevilFruitLevel(bodyA.label) + 1;
        const newX = (bodyA.position.x + bodyB.position.x) / 2;
        const newY = (bodyA.position.y + bodyB.position.y) / 2;
        const devilFruit = createDevilFruit(newX, newY, newLevel);

        Composite.remove(this.#engine.world, [bodyA, bodyB]);

        if (devilFruit) {
          Composite.add(this.#engine.world, [devilFruit]);
        }
      }
    }
  }
}
