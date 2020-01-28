import { Vec2 } from './Math';

import Board from './Board';

import Entity from './Entity';
import Placeful from './Entities/Placeful';
import Player from './Entities/Player';
import UI from './UI';
import Level from './Level';
import Arrow from './Entities/Arrow';
import { EventEmitter } from './Utils';

const BOARD_OFFSET: number = 20;
const BOARD_PLAYER_AREA: number = 50;

/**
 * Events:
 * @event respawn
 * @event restart
 * @event spawnArrow
 * @event level_loaded { level: Level }
 * @event brush_changed
 * @event cell_placed { index: number, brushName: string, TODO: cellName: string }
 * @event cell_removed { index: number, brushName: string, cellName: string }
 * @event togglecell_toggle { state: boolean }
 */

export default class Game extends EventEmitter {
  window_size: Vec2;
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  ui: UI;
  board: Board;
  entities: Array<Entity>;
  player: Player;
  tickno: number = 0;
  brushes: [string, number][];
  level: Level = null;
  arrow: Arrow;

  constructor({
    window_size = new Vec2(500 - BOARD_PLAYER_AREA, 400) as Vec2,
    gameCanvas = document.querySelector('#game') as HTMLCanvasElement,
    uiCanvas = document.querySelector('#ui') as HTMLCanvasElement,
  } = {}) {
    super();
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

    this.brushes = [];

    this.ui = new UI(this, uiCanvas, window_size);

    // this.render();

    window.addEventListener('click', event =>
      this.onClick(new Vec2(event.offsetX, event.offsetY)),
    );

    this.on('cell_placed', ({ brushName }) => {
      const [placedBrush] = this.brushes.filter(
        brushdef => brushdef[0] === brushName,
      );
      if (placedBrush[1] !== -1 && placedBrush[1] !== 0) placedBrush[1]--;
      this.emit('brush_update');
    });

    this.on('cell_removed', ({ brushName }) => {
      const [placedBrush] = this.brushes.filter(
        brushdef => brushdef[0] === brushName,
      );
      placedBrush[1]++;
      this.emit('brush_update');
    });
  }

  start() {
    // setInterval(() => this.tick(), 10);
    requestAnimationFrame(() => this.tick());
  }

  /**
   * Respawn entities and destroyable cells
   */
  respawn() {
    if (!this.level)
      throw new Error('[Game::respawn]: No level is loaded');

    this.level.respawn();
    this.emit('respawn');
  }

  /**
   * Fully restart current level
   */
  restart() {
    if (!this.level)
      throw new Error('[Game::respawn]: No level is loaded');

    this.level.load();
    this.emit('restart');
  }

  spawnArrow(cellY: number) {
    if (this.arrow) return;
    const { board } = this;
    if (cellY < 0 || cellY >= board.boardsize.y)
      throw new Error(
        `[Game::spawnArrow]: cellY must be >= 0 and < ${
          board.boardsize.y
        }`,
      );
    this.arrow = new Arrow(
      this,
      new Vec2(this.window_size.x, board.top + cellY * board.cellsize.y),
    );
    this.arrow.on('destroy', () => {
      this.arrow = null;
      this.respawn();
    });
    this.emit('spawnArrow');
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
    if (this.arrow) this.arrow.tick();
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

    if (this.arrow) this.arrow.render();

    this.ui.render();
  }
}
