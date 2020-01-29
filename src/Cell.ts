import { Vec2 } from './Math';

import Entity from './Entity';
import Game from './Game';
import Board from './Board';
import Arrow from './Entities/Arrow';
import Box from './Box';
import { random } from './Utils';

export interface iCellBrush {
  text: string;
  brushName: string;
  brushClass: any;
}

// TODO: Inherit placeful from it
export abstract class HitboxEntity extends Entity {
  hitbox: Box;

  constructor(game: Game, position: Vec2, size: Vec2, hitbox: Box) {
    super(game, position, size);
    this.hitbox = hitbox;
  }
}

export default abstract class Cell extends HitboxEntity {
  boardposition: Vec2;
  boardsize: Vec2;
  /**
   * Activated counter. Reseted on level respawn.
   */
  activated: number;
  name: string;
  freezed: boolean = false;

  /**
   *
   * @param game
   * @param board
   * @param position - Cell position on board
   * @param size - Cell size on board
   * @param hitbox
   */
  constructor(game: Game, position: Vec2, size: Vec2, hitbox: Box) {
    super(
      game,
      Cell.positionToScreenPosition(game.board, position),
      Cell.sizeToBoardSize(game.board, size),
      hitbox,
    );
    this.boardposition = position;
    this.boardsize = size;
    this.activated = 0;
  }

  get coords(): Vec2 {
    return Cell.positionToScreenPosition(
      this.game.board,
      this.boardposition,
    );
  }

  get screenSize(): Vec2 {
    return Cell.sizeToBoardSize(this.game.board, this.boardsize);
  }

  processArrow(arrow: Arrow): void {
    // console.warn(`Cell::processArrow(): Nothing to process`);
  }

  resetActivated(): void {
    this.activated = 0;
  }

  render() {
    const { ctx, board } = this.game;
    const { coords } = this;
    const { cellsize } = board;

    ctx.strokeStyle = 'red';
    ctx.strokeRect(coords.x, coords.y, cellsize.x, cellsize.y);
  }

  /**
   * Draws an random color flashing rect to display this.hitbox
   */
  renderhitbox() {
    const { ctx, hitbox } = this;

    if (!hitbox) return;

    ctx.fillStyle = `rgb(${random(0, 255)}, ${random(0, 255)}, ${random(
      0,
      255,
    )})`;
    ctx.fillRect(
      this.hitbox.left,
      this.hitbox.top,
      this.hitbox.size.x,
      this.hitbox.size.y,
    );
  }

  static positionToScreenPosition(board: Board, position: Vec2) {
    return new Vec2(
      board.left + position.x * board.cellsize.x,
      board.top + position.y * board.cellsize.y,
    );
  }

  static sizeToBoardSize(board: Board, size: Vec2) {
    // FIXME: It doesn't work :/ (Incorrect values)
    return size.map((val, idx) => val * board.cellsize[idx]);
  }

  static generateCellBox(board: Board, position: Vec2): Box {
    return new Box(
      position.multiply(board.cellsize).plus(board.topleft),
      board.cellsize,
    );
  }
}
