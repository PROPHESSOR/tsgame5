import { EmptyCellBrush } from './EmptyCell';
import { WallCellBrush } from './WallCell';
import { RotateCellClockwiseBrush } from './RotateCellClockwise';
import { RotateCellAntiClockwiseBrush } from './RotateCellAntiClockwise';

const brushes = {
  EmptyCellBrush,
  WallCellBrush,
  RotateCellClockwiseBrush,
  RotateCellAntiClockwiseBrush,
};

export default brushes;

// NOT USED
export type Brushes = keyof typeof brushes;
