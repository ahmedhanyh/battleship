/* eslint-disable */

import Ship from "../lib/ship";

describe("Ship(startCoords, length, orientation) works correctly", () => {
  it("Ship('1A', 1, 'v' | 'h') places a ship of length 1 the same", () => {
    const verticalShip = Ship("1A", 1, "v");
    const horizontalShip = Ship("1A", 1, "h");
    expect(verticalShip.coords).toEqual(["1A"]);
    expect(horizontalShip.coords).toEqual(["1A"]);
  });

  it("Ship('1A', 2, 'v') places ship vertically correctly", () => {
    const ship = Ship("1A", 2, "v");
    expect(ship.coords).toEqual(["1A", "2A"]);
  });

  it("Ship('1A', 2, 'h') places ship horizontally correctly", () => {
    const ship = Ship("1A", 2, "h");
    expect(ship.coords).toEqual(["1A", "1B"]);
  });

  it("Ship('1A', 6, 'v' or 'h') places long ship correctly", () => {
    const longVerticalShip = Ship("1A", 6, "v");
    const longHorizontalShip = Ship("10A", 6, "h");
    expect(longVerticalShip.coords).toEqual([
      "1A",
      "2A",
      "3A",
      "4A",
      "5A",
      "6A",
    ]);
    expect(longHorizontalShip.coords).toEqual([
      "10A",
      "10B",
      "10C",
      "10D",
      "10E",
      "10F",
    ]);
  });

  it("Ship('10A', 2, 'v') doesn't place ship if out of bounds", () => {
    const veryTallShip = Ship("10A", 2, "v");
    const veryWideShip = Ship("1J", 2, "h");
    expect(veryTallShip.coords).toBeNull();
    expect(veryWideShip.coords).toBeNull();
  });
});

describe("Ship.hit() works correctly", () => {
  it("Ship.hit(1) and Ship.hit(2) calls record the hit coords", () => {
    const ship = Ship("1A", 2, "v");
    ship.hit(1);
    expect(ship.hitCoords).toContain("1A");
    ship.hit(2);
    expect(ship.hitCoords).toEqual(["1A", "2A"]);
  });
});

describe("Ship.isSunk() works correctly", () => {
  it("Ship.isSunk() returns true when ship's sunk", () => {
    const ship = Ship("1A", 1, "v");
    ship.hit(1);
    expect(ship.isSunk()).toBe(true);
  });

  it("Ship.isSunk() returns false when ship hasn't sunk", () => {
    const ship = Ship("1A", 1, "v");
    expect(ship.isSunk()).toBe(false);
  });
});
