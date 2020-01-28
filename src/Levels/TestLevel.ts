import Level from '../Level';
import Placeful from '../Entities/Placeful';

export default class TestLevel extends Level {
  name = 'Test Lvl.';
  playerPosition = 1;
  cells = [
    ...[0, 3, 1], //
    ...[1, 4, 2], //
    ...[1, 0, 0], //
  ];
  brushes = [
    ['RotateCellClockwiseBrush', 1],
    ['RotateCellAntiClockwiseBrush', 1],
  ];
  entities = [[Placeful, []]];
}
