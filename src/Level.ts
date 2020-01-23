import { EventEmitter } from './Utils';
import { CellId, cellsById } from './Cells/Cells';
import Game from './Game';
import { Vec2 } from './Math';
import Board from './Board';

abstract class aLevel extends EventEmitter {
  abstract load();
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

    // Validate player position
  }

  private static checkForSquareNumber(number: number): boolean {
    return number > 0 && Math.sqrt(number) % 1 === 0;
  }

  load() {
    // Load map
    const mapSize = Math.floor(Math.sqrt(this.cells.length));

    this.game.board = new Board(this.game, {
      position: this.game.board.position,
      size: this.game.board.size,
      boardsize: new Vec2(mapSize, mapSize),
    });

    this.game.board.cells = [];
    this.cells.forEach((cellId, index) =>
      this.game.board.cells.push(
        new cellsById[cellId](
          this.game,
          this.game.board.getCellPositionByCellIndex(index),
        ),
      ),
    );

    // Load entities
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

    // Load player
    this.game.player.position.y = this.playerPosition;

    // Load brushes
    this.game.brushes = [...this.brushes];
  }
}
