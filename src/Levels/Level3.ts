import Level from '../Level';
import Placeful from '../Entities/Placeful';

export default class Level3 extends Level {
  name = 'Lvl. 3';
  playerPosition = 5;
  cells = [
    ...[0, 0, 0, 0, 0, 0, 0, 0, 0, 0], //
    ...[0, 0, 1, 1, 0, 4, 0, 0, 0, 0], //
    ...[0, 0, 0, 1, 0, 0, 0, 0, 0, 0], //
    ...[0, 0, 4, 0, 0, 3, 0, 0, 0, 0], //
    ...[0, 0, 0, 0, 0, 0, 0, 0, 0, 0], //
    ...[0, 0, 0, 1, 1, 0, 1, 1, 1, 0], // <
    ...[0, 0, 0, 0, 0, 0, 0, 0, 0, 0], //
    ...[0, 1, 0, 0, 0, 4, 0, 1, 0, 0], //
    ...[0, 0, 1, 0, 0, 0, 0, 0, 0, 0], //
    ...[0, 0, 0, 0, 0, 1, 0, 1, 0, 0], //
  ];
  brushes = [
    ['RotateCellClockwiseBrush', 1],
    ['RotateCellAntiClockwiseBrush', 3],
  ];
  entities = [[Placeful, []]];
}
