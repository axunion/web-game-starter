import { Bodies, Body } from "matter-js";

type DevilFruitDefinition = {
  level: number;
  label: string;
  radius: number;
  fillStyle: string;
  texture: string;
};

const creationLevel = 4;

const definitions: DevilFruitDefinition[] = [
  {
    level: 0,
    label: "fruit_0",
    radius: 10,
    fillStyle: "#ff0000",
    texture: "image/fruit/barabara.png",
  },
  {
    level: 1,
    label: "fruit_1",
    radius: 20,
    fillStyle: "#00ff00",
    texture: "image/fruit/utauta.png",
  },
  {
    level: 2,
    label: "fruit_2",
    radius: 30,
    fillStyle: "#0000ff",
    texture: "image/fruit/hanahana.png",
  },
  {
    level: 3,
    label: "fruit_3",
    radius: 40,
    fillStyle: "#ffff00",
    texture: "image/fruit/gorogoro.png",
  },
  {
    level: 4,
    label: "fruit_4",
    radius: 50,
    fillStyle: "#ff00ff",
    texture: "image/fruit/meramera.png",
  },
  {
    level: 5,
    label: "fruit_5",
    radius: 60,
    fillStyle: "#00ffff",
    texture: "image/fruit/yamiyami.png",
  },
  {
    level: 6,
    label: "fruit_6",
    radius: 70,
    fillStyle: "#ffffff",
    texture: "image/fruit/gomugomu.png",
  },
];

export const createDevilFruit = (
  x: number,
  y: number,
  level: number,
): Body | null => {
  const definition = definitions[level];

  if (definition) {
    return Bodies.circle(x, y, definition.radius, {
      label: definition.label,
      density: 0.001,
      restitution: 0.5,
      friction: 0.1,
      render: {
        // fillStyle: definition.fillStyle,
        sprite: {
          texture: definition.texture,
          xScale: (definition.radius * 2) / 100,
          yScale: (definition.radius * 2) / 100,
        },
      },
    });
  }

  return null;
};

export const createRandomDevilFruit = (x: number, y: number): Body | null => {
  const level = Math.floor(Math.random() * creationLevel);
  return createDevilFruit(x, y, level);
};

export const isDevilFruit = (label: string): boolean => {
  return definitions.some((definition) => definition.label === label);
};

export const getDevilFruitLevel = (label: string): number => {
  const definition = definitions.find((d) => d.label === label);
  return definition?.level || 0;
};
