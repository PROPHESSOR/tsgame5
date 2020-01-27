import Cell, { iCellBrush } from '../Cell';
import { Vec2 } from '../Math';
import Game from '../Game';
import Arrow from '../Entities/Arrow';
import Box from '../Box';

export enum RotateDirection {
  CLOCKWISE /* \ */,
  ANTICLOCKWISE /* / */,
}

const HITBOX_SIZE = 32;

function generateRotateCellHitbox(cellHitbox: Box) {
  return new Box(
    cellHitbox.topleft.plus(HITBOX_SIZE / 2),
    cellHitbox.size.minus(HITBOX_SIZE),
  );
}

/** Have two state: normal and active.
 * On hit with the Arrow in normal state changes it to active.
 * Oh hit in active state breaks the Arrow.
 * @abstract
 * @class
 */

export default abstract class ToggleCell extends Cell {
  /** Toggle state
   * false - normal
   * true - active
   */
  state: boolean;

  constructor(game: Game, position: Vec2) {
    super(
      game,
      position,
      new Vec2(1, 1),
      generateRotateCellHitbox(Cell.generateCellBox(game.board, position)),
    );
  }

  tick() {
    // TODO:
  }

  render() {
    const { game, coords } = this;
    const { ctx, board } = game;
    const { cellsize } = board;

    ctx.strokeStyle = 'red';
    ctx.strokeRect(coords.x, coords.y, cellsize.x, cellsize.y);

    ctx.strokeStyle = 'green';
    ctx.beginPath();
    ctx.moveTo(coords.x + cellsize.x, coords.y);
    ctx.lineTo(coords.x, coords.y + cellsize.y);
    ctx.stroke();
  }

  processArrow(arrow: Arrow): void {
    // TODO:
    console.log(`Hit with ToggleCell`, this);
  }
}

export const ToggleCellBrush: iCellBrush = {
  text: 'o',
  brushName: 'ToggleCell',
  brushClass: ToggleCell,
};
