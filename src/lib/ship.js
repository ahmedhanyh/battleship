/* eslint-disable no-plusplus */

function Ship(startCoords, length, orientation) {
  let coords = [startCoords];

  // eslint-disable-next-line no-unused-vars
  const placeShip = ((startCoords_, length_, orientation_) => {
    let row;
    let col;
    let nextRow;
    let nextCol;
    let nextCoords = startCoords_;

    let count = length_ - 1;
    if (orientation_ === "v") {
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

export default Ship;
