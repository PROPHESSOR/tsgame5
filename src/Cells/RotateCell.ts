import Cell from '../Cell';
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

/** Rotates the arrow to some direction on the arrow in
 * @abstract
 * @class
 */

export default abstract class RotateCell extends Cell {
  protected abstract rotateDirection: RotateDirection;

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
    super.render();

    const { game, coords } = this;
    const { ctx, board } = game;
    const { cellsize } = board;

    ctx.strokeStyle = 'gray';
    ctx.beginPath();
    if (this.rotateDirection === RotateDirection.CLOCKWISE) {
      ctx.moveTo(coords.x + cellsize.x, coords.y);
      ctx.lineTo(coords.x, coords.y + cellsize.y);
    } else if (this.rotateDirection === RotateDirection.ANTICLOCKWISE) {
      ctx.moveTo(coords.x, coords.y);
      ctx.lineTo(coords.x + cellsize.x, coords.y + cellsize.y);
    }
    ctx.stroke();
  }

  abstract processArrow(arrow: Arrow);
}
