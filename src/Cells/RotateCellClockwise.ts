import RotateCell, { RotateDirection } from './RotateCell';
import Arrow from '../Entities/Arrow';
import { Direction } from '../Entity';
import { Vec2 } from '../Math';
import { iCellBrush } from '../Cell';

export default class RotateCellClockwise extends RotateCell {
  protected rotateDirection: RotateDirection = RotateDirection.CLOCKWISE;

  name = 'RotateCellClockwise';

  processArrow(arrow: Arrow) {
    switch (arrow.direction) {
      case Direction.UP:
        arrow.rotate(Direction.RIGHT);
        break;
      case Direction.RIGHT:
        arrow.rotate(Direction.UP);
        break;
      case Direction.DOWN:
        arrow.rotate(Direction.LEFT);
        break;
      case Direction.LEFT:
        arrow.rotate(Direction.DOWN);
        break;
      default:
        throw new Error(`Unknown direction ${arrow.direction}`);
    }

    arrow.position = Vec2.from(this.position);
  }
}

export const RotateCellClockwiseBrush: iCellBrush = {
  text: '/',
  brushName: 'RotateCellClockwise',
  brushClass: RotateCellClockwise,
};
