import Level from '../Level';
import Placeful from '../Entities/Placeful';

export default class TestLevel extends Level {
  playerPosition = 1;
  cells = [
    ...[0, 0, 1], //
    ...[1, 4, 2], //
    ...[1, 0, 0], //
  ];
  brushes = [
    ['RotateCellClockwiseBrush', 1],
    ['RotateCellAntiClockwiseBrush', 2],
  ];
  entities = [[Placeful, []]];
}
