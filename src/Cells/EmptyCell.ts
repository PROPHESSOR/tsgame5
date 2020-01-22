import { Vec2 } from '../Math';

import Game from '../Game';
import Board from '../Board';
import Cell from '../Cell';

export default class EmptyCell extends Cell {
  constructor(game: Game, board: Board, position: Vec2) {
    super(game, board, position, new Vec2(1, 1), null);
  }

  render() {
    const { board, game, coords } = this;
    const { ctx } = game;
    const { cellsize } = board;

    ctx.strokeStyle = 'red';
    ctx.strokeRect(coords.x, coords.y, cellsize.x, cellsize.y);
  }

  tick() {
    // TODO:
  }
}
