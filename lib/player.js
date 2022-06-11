import Gameboard from "./gameboard";

function Player(name) {
  const gameboard = Gameboard();
  gameboard.start();

  const attack = (opponent, coords) => {
    opponent.gameboard.receiveAttack(coords);
  };

  const proto = { attack };
  const obj = Object.create(proto);

  return Object.assign(obj, { name, gameboard });
}

export default Player;
