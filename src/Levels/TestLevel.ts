import Level from '../Level';
import Placeful from '../Entities/Placeful';

export default class TestLevel extends Level {
  playerPosition = 1;
  cells = [
    ...[0, 3, 1], //
    ...[1, 4, 2], //
    ...[1, 3, 2], //
  ];
  brushes = [
    ['EmptyCellBrush', -1],
    ['WallCellBrush', 0],
    ['RotateCellClockwiseBrush', 2],
    ['RotateCellAntiClockwiseBrush', 2],
  ];
  entities = [[Placeful, []]];
}
