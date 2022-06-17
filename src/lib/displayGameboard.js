/* eslint-disable */

function displayGameboard(gameboard, showShips = false) {
  const boardDiv = document.createElement("div");
  const emptyCell = document.createElement("div");
  const colHeaders = document.createElement("div");
  const rowHeaders = document.createElement("div");
  const boardContents = document.createElement("div");

  boardDiv.classList.add("board");
  emptyCell.classList.add("empty-cell");
  colHeaders.classList.add("col-headers");
  rowHeaders.classList.add("row-headers");
  boardContents.classList.add("board-contents");

  for (let row = 0; row < 10; row++) {
    const rowHeader = document.createElement("div");
    rowHeader.textContent = `${row + 1}`;
    rowHeaders.appendChild(rowHeader);

    for (let col = 65; col < 75; col++) {
      let cell = document.createElement("button");
      cell.classList.add("cell");
      cell.classList.add("computer-cell");
      cell.setAttribute("data-coords", `${row + 1}${String.fromCharCode(col)}`);
      if (showShips) {
        if (gameboard.board[row][String.fromCharCode(col)] !== null) {
          cell.textContent = "X";
        }
        cell.classList.remove("computer-cell");
      }
      boardContents.appendChild(cell);
    }
  }

  for (let charCode = 65; charCode < 75; charCode++) {
    const colHeader = document.createElement("div");
    colHeader.textContent = `${String.fromCharCode(charCode)}`;
    colHeaders.appendChild(colHeader);
  }

  boardDiv.appendChild(emptyCell);
  boardDiv.appendChild(colHeaders);
  boardDiv.appendChild(rowHeaders);
  boardDiv.appendChild(boardContents);
  document.querySelector("#content").appendChild(boardDiv);
}

function updateGameboardDisplay(playerObj, coords) {
  const boardContents = document.querySelectorAll(".board-contents");
  const row = coords.slice(0, -1);
  const col = coords.slice(-1);
  const targetSpot =
    playerObj.name === "Player"
      ? boardContents[0].querySelector(`[data-coords='${row}${col}']`)
      : boardContents[1].querySelector(`[data-coords='${row}${col}']`);
  const targetState = playerObj.gameboard.board[row - 1][col];
  targetSpot.textContent = targetState === "hit" ? "X" : "--";

  if (targetState === "hit" && playerObj.name === "Player") {
    targetSpot.style.color = "red";
  }

  return targetState;
}

export { updateGameboardDisplay };
export default displayGameboard;
