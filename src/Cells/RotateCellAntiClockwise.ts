import RotateCell, { RotateDirection } from './RotateCell';
import Arrow from '../Entities/Arrow';
import { Direction } from '../Entity';
import { Vec2 } from '../Math';
import { iCellBrush } from '../Cell';

export default class RotateCellAntiClockwise extends RotateCell {
  protected rotateDirection: RotateDirection =
    RotateDirection.ANTICLOCKWISE;

  name = 'RotateCellAntiClockwise';

  processArrow(arrow: Arrow) {
    switch (arrow.direction) {
      case Direction.UP:
        arrow.rotate(Direction.LEFT);
        break;
      case Direction.RIGHT:
        arrow.rotate(Direction.DOWN);
        break;
      case Direction.DOWN:
        arrow.rotate(Direction.RIGHT);
        break;
      case Direction.LEFT:
        arrow.rotate(Direction.UP);
        break;
      default:
        throw new Error(`Unknown direction ${arrow.direction}`);
    }

    arrow.position = Vec2.from(this.position);
  }
}

export const RotateCellAntiClockwiseBrush: iCellBrush = {
  text: '\\',
  brushName: 'RotateCellAntiClockwise',
  brushClass: RotateCellAntiClockwise,
};
