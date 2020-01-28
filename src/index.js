import './styles.scss';

import Game from './Game';
import TestLevel from './Levels/TestLevel';

let index = 0;

const levels = [TestLevel, TestLevel];

function loadLevel(game) {
  const level = new levels[index++](game);
  // level.name = String(Math.random());
  level.init();
  level.load();
}

function main() {
  const game = new Game();
  loadLevel(game);
  game.start();
  game.on('game_nextlevel', () => loadLevel(game));
  return game;
}

window.game = main();
