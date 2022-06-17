import Player from "./lib/player";
import displayGameboard, {
  updateGameboardDisplay,
} from "./lib/displayGameboard";
import "./css/style.css";

const player = Player("Player");
const computer = Player("Computer");

const mainHeading = document.createElement("h1");
mainHeading.textContent = "Battleship";
document.body.appendChild(mainHeading);

const gameText = document.createElement("h2");
gameText.textContent = "Player's turn";
document.body.appendChild(gameText);

const contentDiv = document.createElement("div");
contentDiv.id = "content";
document.body.appendChild(contentDiv);

displayGameboard(player.gameboard, true);
displayGameboard(computer.gameboard);

let gameOver = false;
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
      gameText.textContent = "Player's turn";
      turn = 1;
    } else if (player.gameboard.allShipsSunk()) {
      gameText.textContent = "You Lost.";
      gameText.style.color = "red";
      gameOver = true;
    } else {
      computerAttack();
    }
  }, 500);
}

boardContents[1].addEventListener("click", (e) => {
  if (turn !== 1 || e.target.textContent !== "" || gameOver) {
    return;
  }
  const targetCoords = e.target.dataset.coords;
  player.attack(computer, targetCoords);
  const result = updateGameboardDisplay(computer, targetCoords);
  if (result === "missed") {
    turn = 2;
    gameText.textContent = "Computer's turn";
    computerAttack();
  }
  if (computer.gameboard.allShipsSunk()) {
    gameText.textContent = "You Won!";
    gameText.style.color = "green";
    gameOver = true;
  }
});
