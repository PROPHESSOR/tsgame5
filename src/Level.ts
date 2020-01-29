import { EventEmitter, copyJSON } from './Utils';
import { CellId, cellsById } from './Cells/Cells';
import Game from './Game';
import { Vec2 } from './Math';
import Board from './Board';
import Cell from './Cell';
import EmptyCell from './Cells/EmptyCell';

/**
 * @event restart TODO:
 * @event loaded TODO:
 */
abstract class aLevel extends EventEmitter {
  abstract load();
  abstract respawn();
}

export default abstract class Level extends aLevel {
  game: Game;
  abstract entities: Array<any>; // [EntityClass, [arguments without Game]]
  /**
   * NOTE: `cells` must be a square
   */
  abstract cells: Array<CellId | number>;
  abstract brushes: Array<any>; // [['BrushName', (-1 | 0 | count)]]
  /**
   * Player Y position in cells
   */
  abstract playerPosition: number;
  abstract name: string;

  /**
   * Don't forget to call super.init()!
   */
  constructor(game: Game) {
    super();
    this.game = game;
  }

  init() {
    if (!Level.checkForSquareNumber(this.cells.length))
      throw new Error('Level cells map must be a square matrix');
    if (this.cells.length <= 4)
      throw new Error('Level cells map must be greater than 2x2');

    // TODO: Validate player position

    return this;
  }

  private static checkForSquareNumber(number: number): boolean {
    return number > 0 && Math.sqrt(number) % 1 === 0;
  }

  private loadMap() {
    const mapSize = Math.floor(Math.sqrt(this.cells.length));

    this.game.board = new Board(this.game, {
      position: this.game.board.position,
      size: this.game.board.size,
      boardsize: new Vec2(mapSize, mapSize),
    });

    this.game.board.cells = [];
    this.cells.forEach((cellId, index) => {
      const cell: Cell = new cellsById[cellId](
        this.game,
        this.game.board.getCellPositionByCellIndex(index),
      );

      if (!(cell instanceof EmptyCell)) cell.freezed = true;
      this.game.board.cells.push(cell);
    });
  }

  private loadEntities() {
    this.game.entities = [];
    for (const entitydef of this.entities) {
      this.game.entities.push(
        new entitydef[0](this.game, ...entitydef[1]),
      );
    }

    this.game.entities.forEach((entity, idx) =>
      entity.on('destroy', entity => {
        this.game.entities = this.game.entities.filter(e => e !== entity);
      }),
    );
  }

  private loadPlayer() {
    this.game.player.position.y = this.playerPosition;
  }

  private loadBrushes() {
    this.game.brushes = copyJSON(this.brushes) as Array<any>;
  }

  load() {
    if (this.game.level) this.game.level.unload();

    this.game.level = this;

    this.loadMap();

    this.loadEntities();

    this.loadPlayer();

    this.loadBrushes();

    this.game.emit('level_loaded', { level: this });

    return this;
  }

  unload() {
    // TODO: Game stop
    this.game.stop();
    // TODO: Unload board, entities, etc
    this.game.board.cells = [];
    this.game.entities = [];

    this.game.emit('level_unloaded', { level: this });
  }

  /**
   * On Arrow destroy
   * Respawns all entities and destroyable cells
   */
  respawn() {
    if (this.game.entities.length !== this.entities.length)
      this.loadEntities();

    this.game.board.cells.forEach(cell => cell.resetActivated());
  }
}
