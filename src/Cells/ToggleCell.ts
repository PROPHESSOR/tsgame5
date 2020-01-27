import Cell, { iCellBrush } from '../Cell';
import { Vec2 } from '../Math';
import Game from '../Game';
import Arrow from '../Entities/Arrow';
import Box from '../Box';

const HITBOX_SIZE = 64;

function generateToggleCellHitbox(cellHitbox: Box) {
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
      generateToggleCellHitbox(Cell.generateCellBox(game.board, position)),
    );
    this.state = false;
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

    ctx.fillStyle = this.state ? 'green' : 'red';
    // return;
    ctx.beginPath();
    ctx.arc(
      coords.x + cellsize.x / 2,
      coords.y + cellsize.y / 2,
      cellsize.x / 4,
      0,
      360,
    );
    ctx.fill();
  }

  processArrow(arrow: Arrow): void {
    if (!this.state) this.state = true;
    console.log(`Hit with ToggleCell`, this);
  }
}

export const ToggleCellBrush: iCellBrush = {
  text: 'o',
  brushName: 'ToggleCell',
  brushClass: ToggleCell,
};
