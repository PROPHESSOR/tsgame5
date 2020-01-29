import Level from '../Level';
import Placeful from '../Entities/Placeful';

export default class Level1 extends Level {
  name = 'Lvl. 1';
  playerPosition = 5;
  cells = [
    ...[0, 0, 0, 0, 0, 0, 0, 0, 0, 0], //
    ...[0, 0, 0, 0, 0, 0, 0, 0, 0, 0], //
    ...[0, 0, 0, 0, 0, 1, 0, 0, 0, 0], //
    ...[0, 0, 0, 4, 0, 1, 0, 0, 0, 0], //
    ...[0, 0, 0, 0, 0, 1, 0, 0, 0, 0], //
    ...[0, 0, 0, 0, 0, 0, 0, 0, 0, 0], //
    ...[0, 1, 1, 0, 0, 0, 0, 0, 1, 0], //
    ...[0, 1, 1, 0, 0, 0, 0, 0, 1, 0], //
    ...[0, 0, 0, 0, 0, 0, 0, 0, 1, 0], //
    ...[0, 0, 0, 0, 0, 0, 0, 0, 0, 0], //
  ];
  brushes = [['RotateCellClockwiseBrush', 1]];
  entities = [[Placeful, []]];
}
