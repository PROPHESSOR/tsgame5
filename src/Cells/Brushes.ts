import { EmptyCellBrush } from './EmptyCell';
import { TestCellBrush } from './TestCell';
import { RotateCellClockwiseBrush } from './RotateCellClockwise';
import { RotateCellAntiClockwiseBrush } from './RotateCellAntiClockwise';

const brushes = {
  EmptyCellBrush,
  TestCellBrush,
  RotateCellClockwiseBrush,
  RotateCellAntiClockwiseBrush,
};

export default brushes;

// NOT USED
export type Brushes = keyof typeof brushes;
