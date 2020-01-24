import { Vec2 } from '../Math';

import Entity from '../Entity';
import Game from '../Game';
import Board from '../Board';

const PLAYER_OFFSET_IN_BOARD: number = 10;
const PLAYER_SIZE: Vec2 = new Vec2(10, 10);

export default class Player extends Entity {
  color: string;
  board: Board;

  /**
   *
   * @param game
   * @param board
   * @param {Vec2} position - cell position; The x value is ignored.
   */
  constructor(game: Game, position = new Vec2(0, 0)) {
    super(
      game,
      // Position
      position,
      // Size
      PLAYER_SIZE,
    );
    this.color = 'yellow';

    window.addEventListener('keypress', event =>
      this.onKeyDown(event.keyCode),
    );
  }

  get screenposition() {
    const { position } = this;
    const { board } = this.game;

    return new Vec2(
      board.right + PLAYER_OFFSET_IN_BOARD,
      board.top +
        (board.cellsize.y / 2 - PLAYER_SIZE.y / 2) +
        position.y * board.cellsize.y,
    );
  }

  onKeyDown(key) {
    switch (key) {
      case 119: // W
        if (this.position.y > 0) this.position.y--;
        break;
      case 97: // A
        this.game.spawnArrow(this.position.y);
        break;
      case 115: // S
        if (this.position.y < this.game.board.boardsize.y - 1)
          this.position.y++;
        break;
      case 100: // D
        break;
    }
  }

  tick() {
    //
  }

  render() {
    const { ctx, size, screenposition } = this;
    ctx.fillStyle = this.color;
    // ctx.fillRect(screenposition.x, screenposition.y, size.x, size.y);
    ctx.strokeStyle = this.color;

    ctx.beginPath();
    // Horizontal line
    ctx.moveTo(screenposition.x, screenposition.y + size.y / 2);
    ctx.lineTo(screenposition.x + size.x, screenposition.y + size.y / 2);

    // Top line
    ctx.moveTo(screenposition.x, screenposition.y + size.y / 2);
    ctx.lineTo(screenposition.x + size.x / 2, screenposition.y);

    // Bottom line
    ctx.moveTo(screenposition.x, screenposition.y + size.y / 2);
    ctx.lineTo(screenposition.x + size.x / 2, screenposition.y + size.y);

    ctx.stroke();

    //
  }
}
