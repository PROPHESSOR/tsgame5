import { Vec2 } from '../Math';

import Game from '../Game';
import Cell, { iCellBrush } from '../Cell';
import Arrow from '../Entities/Arrow';

export default class WallCell extends Cell {
  name = 'WallCell';

  constructor(game: Game, position: Vec2) {
    super(
      game,
      position,
      new Vec2(1, 1),
      Cell.generateCellBox(game.board, position),
    );
  }

  processArrow(arrow: Arrow): void {
    arrow.destroy();
  }

  render() {
    super.render();

    const { game, coords } = this;
    const { ctx, board } = game;
    const { cellsize } = board;

    ctx.strokeStyle = 'gray';
    ctx.beginPath();
    ctx.moveTo(coords.x, coords.y);
    ctx.lineTo(coords.x + cellsize.x, coords.y + cellsize.y);
    ctx.moveTo(coords.x + cellsize.x, coords.y);
    ctx.lineTo(coords.x, coords.y + cellsize.y);
    ctx.stroke();
  }
}

export const WallCellBrush: iCellBrush = {
  text: 'x',
  brushName: 'WallCell',
  brushClass: WallCell,
};
