import { Vec2 } from './Math';

import Game from './Game';
import Entity from './Entity';
import Cell from './Cell';
import EmptyCell from './Cells/EmptyCell';
import Cells from './Cells/Cells';
import Box from './Box';

interface iBoardConstructor {
  boardsize: Vec2; // Board size in cells
  position: Vec2; // Left-top screen position in pixels
  size: Vec2; // Screen size in pixels
}

export default class Board extends Entity {
  boardsize: Vec2; // Board size in cells
  cells: Array<Cell>;
  cellsize: Vec2;
  brush: string; // Name of Cells[] key

  /**
   * @constructor
   * @param {Game} game
   * @param {Vec2} size - Size in cells
   */
  constructor(
    game: Game,
    {
      position = new Vec2(),
      size,
      boardsize = new Vec2(10, 10),
    }: iBoardConstructor,
  ) {
    super(game, position, size);
    Vec2.notZero(boardsize);
    this.boardsize = boardsize;

    this.cellsize = new Vec2(
      Math.floor(size.x / boardsize.x),
      Math.floor(size.y / boardsize.y),
    );

    this.cells = [];
    this.brush = null;
  }

  changeBrush(brushName: string) {
    if (typeof Cells[brushName] === 'undefined')
      throw new Error(`Unknown brush ${brushName}`);
    this.brush = brushName;
    console.log(`Brush changed to`, brushName);
    this.game.emit('brush_changed');
  }

  onClick(position: Vec2): boolean {
    const hitbox = new Box(this.position, this.size);

    if (!hitbox.checkInside(position)) return false;

    const idx = this.getCellIndexByScreenCoords(position);
    const cell = this.cells[idx];

    if (cell instanceof EmptyCell) {
      if (!this.brush) return true;
      // Place
      const brushName = `${this.brush}Brush`;
      // Check for available brushes
      const [[, amount]] = this.game.brushes.filter(
        brush => brush[0] === brushName,
      );
      if (amount < 1) return true;
      this.cells[idx] = new Cells[this.brush](
        this.game,
        this.getCellPositionByCellIndex(idx),
      );
      this.game.emit('cell_placed', {
        brushName,
        index: idx,
        cellName: this.brush,
      });
    } else if (!cell.freezed) {
      // Remove
      this.cells[idx] = new EmptyCell(
        this.game,
        this.getCellPositionByCellIndex(idx),
      );
      this.game.emit('cell_removed', {
        index: idx,
        cellName: cell.name,
        brushName: `${cell.name}Brush`,
      });
    }
    return true;
  }

  getCellPositionByCellIndex(index: number): Vec2 {
    const y = Math.floor(index / this.boardsize.y);
    index %= this.boardsize.x;
    index -= y;
    return new Vec2(index + y, y);
  }

  getCellIndexByScreenCoords(coords: Vec2): number {
    coords.x = Math.min(coords.x, this.right);
    coords.y = Math.min(coords.y, this.bottom);
    return (
      Math.floor((coords.y - this.top) / this.cellsize.y) *
        this.boardsize.x +
      Math.floor((coords.x - this.left) / this.cellsize.x)
    );
  }

  getCellByScreenCoords(coords: Vec2): Cell {
    return this.cells[this.getCellIndexByScreenCoords(coords)];
  }

  render(): void {
    this.cells.forEach(cell => {
      cell.render();
    });
  }

  tick(tickno: number): void {
    this.cells.forEach(entity => entity.tick(tickno));
  }
}
