import './styles.scss';

import Game from './Game';
import TestLevel from './Levels/TestLevel';
import Level1 from './Levels/Level1';
import Level2 from './Levels/Level2';
import Level3 from './Levels/Level3';

let index = 0; // 0

const levels = [TestLevel, Level1, Level2, Level3];

function loadLevel(game) {
  if (index > levels.length - 1) return game.stop();
  const level = new levels[index++](game);
  // level.name = String(Math.random());
  level.init();
  level.load();
  game.start();
}

function main() {
  const game = new Game();
  loadLevel(game);
  game.start();
  game.on('game_nextlevel', () => loadLevel(game));
  return game;
}

window.game = main();
