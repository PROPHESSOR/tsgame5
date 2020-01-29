import { Vec2 } from '../Math';

import Game from '../Game';
import Cell, { iCellBrush } from '../Cell';

export default class EmptyCell extends Cell {
  name = 'EmptyCell';

  constructor(game: Game, position: Vec2) {
    super(game, position, new Vec2(1, 1), null);
  }

  tick() {
    // TODO:
  }
}

export const EmptyCellBrush: iCellBrush = {
  text: '',
  brushName: 'EmptyCell',
  brushClass: EmptyCell,
};
