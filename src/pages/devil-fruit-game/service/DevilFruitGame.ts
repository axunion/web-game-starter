import {
  Body,
  Composite,
  Engine,
  Events,
  IEventCollision,
  Render,
  Runner,
} from "matter-js";
import { BOX_HEIGHT, BOX_WIDTH } from "../constants/config";
import { ground, leftWall, rightWall } from "./layout";
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
  #currentFruit: Body | null = null;
  // #nextFruit: Body;
  #isFruitFalling = false;

  constructor(fruitsBox: HTMLElement) {
    this.#fruitsBox = fruitsBox;
    this.#engine = Engine.create();
    this.#runner = Runner.create({ isFixed: true });

    this.#render = Render.create({
      element: fruitsBox,
      engine: this.#engine,
      options: {
        background: "transparent",
        width: BOX_WIDTH,
        height: BOX_HEIGHT,
        pixelRatio: window.devicePixelRatio,
        wireframes: false,
      },
    });

    Render.run(this.#render);
    Runner.run(this.#runner, this.#engine);
    Events.on(this.#engine, "collisionStart", this.#collision.bind(this));
  }

  start() {
    Composite.clear(this.#engine.world, false);
    Composite.add(this.#engine.world, [ground, leftWall, rightWall]);

    this.#createFruit();

    this.#fruitsBox.addEventListener("click", () => {
      if (this.#currentFruit === null || this.#isFruitFalling) {
        return;
      }

      Body.setStatic(this.#currentFruit, false);
      this.#isFruitFalling = true;

      setTimeout(() => {
        this.#isFruitFalling = false;
        this.#createFruit();
      }, 1000);
    });
  }

  #createFruit() {
    const { left, width } = this.#fruitsBox.getBoundingClientRect();
    const x = left + width / 2;
    const y = 0;
    const devilFruit = createRandomDevilFruit(x, y);

    if (devilFruit) {
      Body.setStatic(devilFruit, true);
      Composite.add(this.#engine.world, [devilFruit]);
      this.#currentFruit = devilFruit;
    }
  }

  #collision(event: IEventCollision<Engine>) {
    const { pairs } = event;

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
