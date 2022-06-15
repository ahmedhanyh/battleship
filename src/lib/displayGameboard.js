/* eslint-disable */

export default function displayGameboard(gameboard) {
  const boardDiv = document.createElement("div");
  boardDiv.classList.add("board");

  for (let row = 0; row < 10; row++) {
    for (let col = 65; col < 75; col++) {
      let cell = document.createElement("div");
      cell.classList.add("cell");
      cell.setAttribute("data-coords", `${row + 1}${String.fromCharCode(col)}`);
      boardDiv.appendChild(cell);
    }
  }

  document.querySelector("#content").appendChild(boardDiv);
}
