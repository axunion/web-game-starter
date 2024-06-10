import { Bodies, Body } from "matter-js";

type DevilFruitDefinition = {
  level: number;
  label: string;
  radius: number;
  fillStyle: string;
  texture: {
    img: string;
    width: number;
    height: number;
  };
};

const maxLevelOffset = 4;

const definitions: DevilFruitDefinition[] = [
  {
    level: 0,
    label: "fruit_0",
    radius: 20,
    fillStyle: "#ff0000",
    texture: {
      img: "image/fruit/barabara.png",
      width: 160,
      height: 160,
    },
  },
  {
    level: 1,
    label: "fruit_1",
    radius: 30,
    fillStyle: "#00ff00",
    texture: {
      img: "image/fruit/utauta.png",
      width: 160,
      height: 160,
    },
  },
  {
    level: 2,
    label: "fruit_2",
    radius: 40,
    fillStyle: "#0000ff",
    texture: {
      img: "image/fruit/hanahana.png",
      width: 160,
      height: 160,
    },
  },
  {
    level: 3,
    label: "fruit_3",
    radius: 50,
    fillStyle: "#ffff00",
    texture: {
      img: "image/fruit/meromero.png",
      width: 160,
      height: 160,
    },
  },
  {
    level: 4,
    label: "fruit_4",
    radius: 60,
    fillStyle: "#ff00ff",
    texture: {
      img: "image/fruit/gorogoro.png",
      width: 160,
      height: 160,
    },
  },
  {
    level: 5,
    label: "fruit_5",
    radius: 80,
    fillStyle: "#00ffff",
    texture: {
      img: "image/fruit/meramera.png",
      width: 160,
      height: 160,
    },
  },
  {
    level: 6,
    label: "fruit_6",
    radius: 100,
    fillStyle: "#ffffff",
    texture: {
      img: "image/fruit/gomugomu.png",
      width: 160,
      height: 160,
    },
  },
];

export const createDevilFruit = (
  x: number,
  y: number,
  level: number,
): Body | null => {
  const definition = definitions[level];

  if (definition) {
    const scale = (definition.radius * 2) / 200;

    return Bodies.circle(x, y, definition.radius, {
      label: definition.label,
      density: 0.001,
      frictionAir: 0.03,
      restitution: 0.5,
      friction: 0.1,
      render: {
        fillStyle: definition.fillStyle,
        sprite: {
          texture: definition.texture.img,
          xScale: scale,
          yScale: scale,
        },
      },
    });
  }

  return null;
};

export const createRandomDevilFruit = (x: number, y: number): Body | null => {
  const level = Math.floor(Math.random() * maxLevelOffset);
  return createDevilFruit(x, y, level);
};

export const isDevilFruit = (label: string): boolean => {
  return definitions.some((definition) => definition.label === label);
};

export const getDevilFruitLevel = (label: string): number => {
  const definition = definitions.find((d) => d.label === label);
  return definition?.level || 0;
};
