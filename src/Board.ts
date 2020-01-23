import { Vec2 } from './Math';

import Game from './Game';
import Entity from './Entity';
import Cell from './Cell';
import EmptyCell from './Cells/EmptyCell';
import Cells from './Cells/Cells';
import RotateCellClockwise from './Cells/RotateCellClockwise';
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
    this.brush = 'EmptyCell';

    // this.todoSpawnCells();
  }

  changeBrush(brushName: string) {
    if (typeof Cells[brushName] === 'undefined')
      throw new Error(`Unknown brush ${brushName}`);
    this.brush = brushName;
    console.log(`Brush changed to`, brushName);
  }

  todoSpawnCells() {
    for (let col = 0; col < this.boardsize.x; col++) {
      for (let row = 0; row < this.boardsize.y; row++) {
        this.cells.push(new EmptyCell(this.game, new Vec2(row, col)));
      }
    }

    this.cells[11] = new RotateCellClockwise(this.game, new Vec2(1, 1));

    this.cells[31] = new RotateCellClockwise(this.game, new Vec2(1, 3));
  }

  onClick(position: Vec2): boolean {
    const hitbox = new Box(this.position, this.size);

    if (!hitbox.checkInside(position)) return false;

    const idx = this.getCellIndexByScreenCoords(position);
    this.cells[idx] = new Cells[this.brush](
      this.game,
      this.getCellPositionByCellIndex(idx),
    );
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
    // this.ctx.strokeStyle = 'gray';
    // for (let x = 0; x < this.boardsize.x; x++) {
    //   for (let y = 0; y < this.boardsize.y; y++) {
    //     this.ctx.strokeRect(
    //       this.left + x * this.cellsize.x,
    //       this.top + y * this.cellsize.y,
    //       this.cellsize.x,
    //       this.cellsize.y,
    //     );
    //   }
    // }
    this.cells.forEach(entity => {
      entity.render();
    });
  }

  tick(tickno: number): void {
    this.cells.forEach(entity => entity.tick(tickno));
  }
}
