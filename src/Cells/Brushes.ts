import { EmptyCellBrush } from './EmptyCell';
import { WallCellBrush } from './WallCell';
import { RotateCellClockwiseBrush } from './RotateCellClockwise';
import { RotateCellAntiClockwiseBrush } from './RotateCellAntiClockwise';
import { ToggleCellBrush } from './ToggleCell';
import { iCellBrush } from '../Cell';

const brushes = {
  EmptyCellBrush,
  WallCellBrush,
  RotateCellClockwiseBrush,
  RotateCellAntiClockwiseBrush,
  ToggleCellBrush,
};

export default brushes;

export interface iBrushesById {
  [key: number]: iCellBrush;
}

export const brushesById: iBrushesById = {
  0: EmptyCellBrush,
  1: WallCellBrush,
  2: RotateCellClockwiseBrush,
  3: RotateCellAntiClockwiseBrush,
  4: ToggleCellBrush,
};

// NOT USED
export type Brushes = keyof typeof brushes;
