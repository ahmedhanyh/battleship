import Player from "./lib/player";
import displayGameboard, {
  updateGameboardDisplay,
} from "./lib/displayGameboard";
import "./css/style.css";

const player = Player("Player");
const computer = Player("Computer");

const contentDiv = document.createElement("div");
contentDiv.id = "content";
document.body.appendChild(contentDiv);

displayGameboard(player.gameboard);
displayGameboard(computer.gameboard);

let turn = 1;

const boardContents = document.querySelectorAll(".board-contents");

const allCells = boardContents[0].querySelectorAll(".cell");
const allCoords = [];
allCells.forEach((cell) => {
  const { coords } = cell.dataset;
  allCoords.push(coords);
});

function getRandomInt(n) {
  return Math.floor(Math.random() * n);
}

function computerAttack() {
  setTimeout(() => {
    const coordsIndex = getRandomInt(allCoords.length);
    const targetCoords = allCoords[coordsIndex];
    allCoords.splice(coordsIndex, 1);
    computer.attack(player, targetCoords);
    const result = updateGameboardDisplay(player, targetCoords);
    if (result === "missed") {
      turn = 1;
    } else {
      computerAttack();
    }
  }, 500);
}

boardContents[1].addEventListener("click", (e) => {
  if (turn !== 1 || e.target.textContent !== "") {
    return;
  }
  const targetCoords = e.target.dataset.coords;
  player.attack(computer, targetCoords);
  const result = updateGameboardDisplay(computer, targetCoords);
  if (result === "missed") {
    turn = 2;
    computerAttack();
  }
});
