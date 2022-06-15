import Player from "./lib/player";
import displayGameboard from "./lib/displayGameboard";
import "./css/style.css";

const player = Player("Player");
const computer = Player("Computer");

const contentDiv = document.createElement("div");
contentDiv.id = "content";
document.body.appendChild(contentDiv);

displayGameboard(player.gameboard);
displayGameboard(computer.gameboard);
