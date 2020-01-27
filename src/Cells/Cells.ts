import EmptyCell from './EmptyCell';
import RotateCellClockwise from './RotateCellClockwise';
import RotateCellAntiClockwise from './RotateCellAntiClockwise';
import WallCell from './WallCell';

const cells = {
  EmptyCell,
  RotateCellClockwise,
  RotateCellAntiClockwise,
  WallCell,
};

export default cells;

export const cellsById = {
  0: EmptyCell,
  1: WallCell,
  2: RotateCellClockwise,
  3: RotateCellAntiClockwise,
};

export type CellId = keyof typeof cellsById;

export type Cells = keyof typeof cells;
