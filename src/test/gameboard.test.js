/* eslint-disable */

import Gameboard from "../lib/gameboard";

describe("Gameboard() works correctly", () => {
  const emptyGrid = [];
  for (let i = 0; i < 10; i++) {
    let row = {};
    for (let charCode = 65; charCode < 75; charCode++) {
      row[String.fromCharCode(charCode)] = null;
    }
    emptyGrid.push(row);
  }

  it("Gameboard() initializes an empty grid", () => {
    const gameboard = Gameboard();
    expect(gameboard.board).toEqual(emptyGrid);
  });

  it("Gameboard().start() places 10 ships on the grid", () => {
    const gameboard = Gameboard();
    gameboard.start();

    expect(gameboard.ships.length).toEqual(10);

    let colCode = 66;
    let col;
    let row = 0;
    let coord;

    // eslint-disable-next-line
    for (let i = 0; i < 10; i++) {
      col = String.fromCharCode(colCode);

      expect(gameboard.board[row][col]).not.toBeNull();

      colCode = (colCode + 3) % 75;
      if (colCode < 66) colCode = 66;
      row = (row + 2) % 10;
    }
  });
});

describe("Gameboard().receiveAttack(coords) works correctly", () => {
  it("Gameboard().receiveAttack('1A') marks spot as 'missed' on the grid", () => {
    const gameboard = Gameboard();
    gameboard.start();
    gameboard.receiveAttack("1A");
    expect(gameboard.board[0]["A"]).toBe("missed");
  });

  it("Gameboard().receiveAttack('1B') marks spot as 'hit' on the grid", () => {
    const gameboard = Gameboard();
    gameboard.start();
    gameboard.receiveAttack("1B");
    expect(gameboard.board[0]["B"]).toBe("hit");
  });

  it("Gameboard().receiveAttack('1B') returns message if spot has been hit before", () => {
    const gameboard = Gameboard();
    gameboard.start();
    gameboard.receiveAttack("1B");
    const msg = gameboard.receiveAttack("1B");
    expect(msg).toBe("Already been targeted before");
  });
});

describe("Gameboard() methods work correctly", () => {
  it("Gameboard().allShipsSunk() returns false when there are still ships afloat", () => {
    const gameboard = Gameboard();
    gameboard.start();
    expect(gameboard.allShipsSunk()).toBe(false);
  });

  it("Gameboard().allShipsSunk() returns true in case all ships have sunk", () => {
    const gameboard = Gameboard();
    gameboard.start();

    for (let ship of gameboard.ships) {
      let coords = ship.coords[0];
      gameboard.receiveAttack(coords);
    }

    expect(gameboard.allShipsSunk()).toBe(true);
  });
});
