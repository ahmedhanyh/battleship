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

const boardContents = document.querySelectorAll(".board-contents");

boardContents[1].addEventListener("click", (e) => {
  const targetCoords = e.target.dataset.coords;
  player.attack(computer, targetCoords);
  const targetSpot = boardContents[1].querySelector(
    `[data-coords='${targetCoords}']`
  );
  const targetState =
    computer.gameboard.board[targetCoords.slice(0, -1) - 1][targetCoords[1]];
  targetSpot.textContent = targetState === "hit" ? "X" : "--";
});
