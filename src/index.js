import './styles.scss';

import Game from './Game';
import TestLevel from './Levels/TestLevel';

function main() {
  const game = new Game();
  const level = new TestLevel(game);
  level.init();
  level.load();
  game.start();
  return game;
}

window.game = main();
