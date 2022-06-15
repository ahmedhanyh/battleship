import Player from "../lib/player";

it("Player(name) creates a new player with the name passed in", () => {
  const player = Player("Player");
  expect(player.gameboard).not.toBeNull();
  expect(player.name).toBe("Player");
});

it("Player().attack(opponent, coords) attacks the opponent's ship at\
    specified coords", () => {
  const player = Player("Player");
  const opponent = Player("Computer");
  player.attack(opponent, "1A");
  expect(opponent.gameboard.board[0]["A"]).toBe("missed");
});

it("Player().attack(opponent, coords) attacks the opponent's ship at\
    specified coords", () => {
  const player = Player("Player");
  const opponent = Player("Computer");
  player.attack(opponent, "1B");
  expect(opponent.gameboard.board[0]["B"]).toBe("hit");
});
