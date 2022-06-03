function Ship(startCoords, length, orientation) {
  let coords = [startCoords];

  const placeShip = ((startCoords, length, orientation) => {
    let row, col, nextRow, nextCol;
    let nextCoords = startCoords;

    let count = length - 1;
    if (orientation === "v") {
      while (count > 0) {
        row = nextCoords.slice(0, -1);

        if (row === "10") {
          coords = null;
          break;
        }

        col = nextCoords.slice(-1);
        nextRow = Number(row) + 1;
        nextCoords = nextRow + col;
        coords.push(nextCoords);
        count--;
      }
    } else {
      while (count > 0) {
        row = nextCoords.slice(0, -1);
        col = nextCoords.slice(-1);

        if (col === "J") {
          coords = null;
          break;
        }

        nextCol = String.fromCharCode(col.charCodeAt(0) + 1);
        nextCoords = row + nextCol;
        coords.push(nextCoords);
        count--;
      }
    }
  })(startCoords, length, orientation);

  const hitCoords = [];

  const hit = (num) => hitCoords.push(coords[num - 1]);

  const isSunk = () => hitCoords.length === length;

  const obj = Object.create({ hit, isSunk });

  return Object.assign(obj, { coords, hitCoords });
}

// function gameBoard() {

// }

export default Ship;
