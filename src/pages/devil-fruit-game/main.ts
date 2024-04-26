import "./style.css";
import { DevilFruitGame } from "./service/DevilFruitGame";

const fruitsBox = document.querySelector(".fruits-box") as HTMLElement;
const game = new DevilFruitGame(fruitsBox);
game.init();
