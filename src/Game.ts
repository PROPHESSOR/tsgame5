import { Vec2 } from './Math';

import Board from './Board';

import Entity from './Entity';
import Placeful from './Entities/Placeful';
import Player from './Entities/Player';
import UI from './UI';

const BOARD_OFFSET: number = 20;
const BOARD_PLAYER_AREA: number = 50;

export default class Game {
  window_size: Vec2;
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  ui: UI;
  board: Board;
  entities: Array<Entity>;
  player: Player;
  tickno: number = 0;

  constructor({
    window_size = new Vec2(500 - BOARD_PLAYER_AREA, 400) as Vec2,
    gameCanvas = document.querySelector('#game') as HTMLCanvasElement,
    uiCanvas = document.querySelector('#ui') as HTMLCanvasElement,
  } = {}) {
    this.window_size = window_size;
    this.canvas = gameCanvas;
    [gameCanvas.width, gameCanvas.height] = [window_size.x, window_size.y];
    [uiCanvas.width, uiCanvas.height] = [window_size.x, window_size.y];
    this.ctx = gameCanvas.getContext('2d', { alpha: false });

    const boardscreensize = this.window_size.map(
      val => val - BOARD_OFFSET,
    );
    boardscreensize.x -= BOARD_PLAYER_AREA;

    this.board = new Board(this, {
      position: new Vec2(BOARD_OFFSET / 2, BOARD_OFFSET / 2),
      size: boardscreensize,
      boardsize: new Vec2(10, 10),
    });

    this.player = new Player(this);

    this.entities = [new Placeful(this)];
    this.entities.forEach((entity, idx) =>
      entity.on('destroy', () => {
        this.entities.splice(idx, 1);
      }),
    );

    this.ui = new UI(this, uiCanvas, window_size);

    this.render();

    window.addEventListener('click', event =>
      this.onClick(new Vec2(event.offsetX, event.offsetY)),
    );
  }

  start() {
    // setInterval(() => this.tick(), 10);
    requestAnimationFrame(() => this.tick());
  }

  onClick(position: Vec2): boolean {
    if (this.ui.onClick(position)) return true;
    if (this.board.onClick(position)) return true;
    return false;
  }

  tick() {
    requestAnimationFrame(() => this.tick());
    this.tickno++;
    this.entities.forEach(entity => entity.tick(this.tickno));
    this.player.tick();
    this.ctx.save();
    this.render();
    this.ctx.restore();
  }

  render() {
    this.ctx.fillStyle = 'black';
    this.ctx.fillRect(0, 0, this.window_size.x, this.window_size.y);

    this.board.render();

    this.entities.forEach(entity => entity.render());

    this.player.render();

    this.ui.render();
  }
}
