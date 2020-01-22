import EmptyCell from './EmptyCell';
import RotateCellClockwise from './RotateCellClockwise';
import RotateCellAntiClockwise from './RotateCellAntiClickwise';
import TestCell from './TestCell';

const cells = {
  EmptyCell,
  RotateCellClockwise,
  RotateCellAntiClockwise,
  TestCell,
};

export default cells;

// NOT USED
export type Cells = keyof typeof cells;
