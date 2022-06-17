/* eslint-disable no-plusplus */

import Ship from "./ship";

function Gameboard() {
  const board = [];
  let ships = [];
  let gameStarted = false;

  for (let i = 0; i < 10; i++) {
    const row = {};
    for (let charCode = 65; charCode < 75; charCode++) {
      row[String.fromCharCode(charCode)] = null;
    }
    board.push(row);
  }

  const placeShips = () => {
    let colCode = 66;
    let col;
    let row = 0;
    let coord;

    // eslint-disable-next-line
    for (let i = 0; i < 10; i++) {
      col = String.fromCharCode(colCode);
      coord = `${row + 1}${col}`;
      const ship = Ship(coord, 1, "h");
      board[row][col] = ship;
      ships.push(ship);
      colCode = (colCode + 3) % 75;
      if (colCode < 66) colCode = 66;
      row = (row + 2) % 10;
    }
  };

  const start = () => {
    placeShips();
    gameStarted = true;
  };

  // eslint-disable-next-line
  const receiveAttack = (coords) => {
    const spot = board[coords.slice(0, -1) - 1][coords[coords.length - 1]];
    if (spot !== null) {
      if (spot === "missed" || spot === "hit") {
        return "Already been targeted before";
      }

      spot.hit(1);
      if (spot.isSunk()) {
        ships = ships.filter((ship) => ship !== spot);
      }
      board[coords[0] - 1][coords[1]] = "hit";
    } else {
      board[coords[0] - 1][coords[1]] = "missed";
    }
  };

  const allShipsSunk = () => ships.length === 0 && gameStarted;

  return {
    board,
    ships,
    start,
    receiveAttack,
    allShipsSunk,
  };
}

export default Gameboard;
