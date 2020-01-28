import { Vec2 } from '../Math';

import Game from '../Game';
import Cell, { iCellBrush } from '../Cell';

export default class EmptyCell extends Cell {
  name = 'EmptyCell';

  constructor(game: Game, position: Vec2) {
    super(game, position, new Vec2(1, 1), null);
  }

  render() {
    const { game, coords } = this;
    const { ctx, board } = game;
    const { cellsize } = board;

    ctx.strokeStyle = 'red';
    ctx.strokeRect(coords.x, coords.y, cellsize.x, cellsize.y);
  }

  tick() {
    // TODO:
  }
}

export const EmptyCellBrush: iCellBrush = {
  text: '',
  brushName: 'EmptyCell',
  brushClass: EmptyCell,
};
