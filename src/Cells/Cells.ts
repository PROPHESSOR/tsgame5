import EmptyCell from './EmptyCell';
import RotateCellClockwise from './RotateCellClockwise';
import RotateCellAntiClockwise from './RotateCellAntiClockwise';
import WallCell from './WallCell';
import ToggleCell from './ToggleCell';

const cells = {
  EmptyCell,
  RotateCellClockwise,
  RotateCellAntiClockwise,
  WallCell,
  ToggleCell,
};

export default cells;

export const cellsById = {
  0: EmptyCell,
  1: WallCell,
  2: RotateCellClockwise,
  3: RotateCellAntiClockwise,
  4: ToggleCell,
};

export type CellId = keyof typeof cellsById;

export type Cells = keyof typeof cells;
