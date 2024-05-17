import { Bodies, Body } from "matter-js";

type DevilFruitDefinition = {
  level: number;
  label: string;
  radius: number;
  color: string;
  texture: string;
};

const definitions: DevilFruitDefinition[] = [
  { level: 0, label: "fruit_0", radius: 10, color: "#ff0000", texture: "" },
  { level: 1, label: "fruit_1", radius: 20, color: "#00ff00", texture: "" },
  { level: 2, label: "fruit_2", radius: 30, color: "#0000ff", texture: "" },
  { level: 3, label: "fruit_3", radius: 40, color: "#ffff00", texture: "" },
  { level: 4, label: "fruit_4", radius: 50, color: "#ff00ff", texture: "" },
  { level: 5, label: "fruit_5", radius: 60, color: "#00ffff", texture: "" },
  { level: 6, label: "fruit_6", radius: 70, color: "#000000", texture: "" },
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
    });
  }

  return null;
};

export const createRandomDevilFruit = (x: number, y: number): Body | null => {
  const level = Math.floor(Math.random() * definitions.length);
  return createDevilFruit(x, y, level);
};

export const isDevilFruit = (label: string): boolean => {
  return definitions.some((definition) => definition.label === label);
};

export const getDevilFruitLevel = (label: string): number => {
  const definition = definitions.find((d) => d.label === label);
  return definition?.level || 0;
};
