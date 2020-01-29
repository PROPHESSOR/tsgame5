import Cell, { iCellBrush } from '../Cell';
import { Vec2 } from '../Math';
import Game from '../Game';
import Arrow from '../Entities/Arrow';
import Box from '../Box';
import Board from '../Board';

function generateToggleCellHitbox(board: Board, cellHitbox: Box) {
  return new Box(
    cellHitbox.center.minus(board.cellsize.divide(4)),
    cellHitbox.size.minus(board.cellsize.divide(2)),
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
  _state: boolean;

  name = 'ToggleCell';

  constructor(game: Game, position: Vec2) {
    super(
      game,
      position,
      new Vec2(1, 1),
      generateToggleCellHitbox(
        game.board,
        Cell.generateCellBox(game.board, position),
      ),
    );
    this.state = false;
  }

  get state() {
    return this._state;
  }

  set state(state) {
    this._state = state;
    this.game.emit('togglecell_toggle', { state });
  }

  tick() {
    // TODO:
  }

  render() {
    super.render();

    const { game, coords } = this;
    const { ctx, board } = game;
    const { cellsize } = board;

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

  resetActivated() {
    this.state = false;
  }

  processArrow(arrow: Arrow): void {
    arrow.position = Vec2.from(this.position);
    if (!this.state) this.state = true;
    else arrow.destroy();
  }
}

export const ToggleCellBrush: iCellBrush = {
  text: 'o',
  brushName: 'ToggleCell',
  brushClass: ToggleCell,
};
