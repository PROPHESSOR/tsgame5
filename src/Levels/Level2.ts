import Level from '../Level';
import Placeful from '../Entities/Placeful';

export default class Level2 extends Level {
  name = 'Lvl. 2';
  playerPosition = 5;
  cells = [
    ...[2, 0, 0, 0, 0, 0, 0, 0, 0, 0], //
    ...[0, 0, 0, 0, 0, 0, 0, 4, 1, 0], //
    ...[0, 0, 0, 0, 0, 0, 0, 0, 0, 0], //
    ...[0, 0, 0, 0, 0, 0, 0, 0, 0, 0], //
    ...[0, 0, 0, 0, 0, 0, 0, 0, 0, 0], //
    ...[0, 0, 0, 0, 0, 0, 1, 1, 1, 0], // <
    ...[0, 0, 1, 0, 1, 0, 0, 0, 0, 0], //
    ...[0, 0, 4, 0, 0, 0, 0, 0, 0, 0], //
    ...[0, 0, 1, 1, 0, 0, 0, 0, 0, 0], //
    ...[0, 0, 0, 0, 0, 0, 0, 0, 0, 0], //
  ];
  brushes = [
    ['RotateCellClockwiseBrush', 1],
    ['RotateCellAntiClockwiseBrush', 2],
  ];
  entities = [[Placeful, []]];
}
