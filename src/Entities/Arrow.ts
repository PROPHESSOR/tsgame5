import { Vec2 } from '../Math';
import { random } from '../Utils';

import Game from '../Game';
import Entity, { Direction } from '../Entity';
import Box from '../Box';
import EmptyCell from '../Cells/EmptyCell';

const ARROW_HITBOX: number = 6;

export default class Arrow extends Entity {
  protected color: string;
  protected scale: number = 10; // Number of pixels to squeeze. scale+ -> height-
  direction: Direction = Direction.LEFT;
  hitbox: Box;
  private arrowSpeed: number = 2;

  constructor(game: Game, position: Vec2 = new Vec2()) {
    super(game, position, game.board.cellsize.map(val => val - 2)); // new Vec2(50, 15)
    // NOTE: Size must be square to proper collision detection on rotations
    this.direction = Direction.LEFT;
    this.scale = 10;
    this.updateHitbox();
    this.arrowSpeed = game.board.cellsize.x / 32; // FIXME: May cause a problem when used with a big boards
  }

  destroy(): void {
    this.emit('destroy');
  }

  rotate(direction: Direction): void {
    this.direction = direction;
    this.updateHitbox();
  }

  updateHitbox(): void {
    this.hitbox = new Box(this.position, this.size);
    switch (this.direction) {
      case Direction.UP:
        this.hitbox = new Box(
          new Vec2(
            this.position.x + this.size.x / 2 - this.size.x / 16,
            this.position.y,
          ),
          new Vec2(this.size.x / 8, ARROW_HITBOX),
        );
        break;
      case Direction.DOWN:
        this.hitbox = new Box(
          new Vec2(
            this.position.x + this.size.x / 2 - this.size.x / 16,
            this.position.y + this.size.y - ARROW_HITBOX,
          ),
          new Vec2(this.size.x / 8, ARROW_HITBOX),
        );
        break;
      case Direction.LEFT:
        this.hitbox = new Box(
          new Vec2(
            this.position.x,
            this.position.y + this.size.y / 2 - this.size.y / 16,
          ),
          new Vec2(ARROW_HITBOX, this.size.y / 8),
        );
        break;
      case Direction.RIGHT:
        this.hitbox = new Box(
          new Vec2(
            this.position.x + this.size.x - ARROW_HITBOX,
            this.position.y + this.size.y / 2 - this.size.y / 16,
          ),
          new Vec2(ARROW_HITBOX, this.size.y / 8),
        );
        break;
      default:
        throw new Error(`Unknown direction ${this.direction}`);
    }
  }

  tick() {
    switch (this.direction) {
      case Direction.UP:
        this.position.y -= this.arrowSpeed;
        break;
      case Direction.DOWN:
        this.position.y += this.arrowSpeed;
        break;
      case Direction.LEFT:
        this.position.x -= this.arrowSpeed;
        break;
      case Direction.RIGHT:
        this.position.x += this.arrowSpeed;
        break;
      default:
        throw new Error(`Unknown direction ${this.direction}`);
    }

    this.updateHitbox();

    // Check for obstacle collision
    for (const cell of this.game.board.cells) {
      const { hitbox } = cell;

      if (!hitbox) continue;

      let hit = false;

      if (
        (this.direction === Direction.LEFT ||
          this.direction === Direction.RIGHT) &&
        this.hitbox.left <= hitbox.right &&
        this.hitbox.right >= hitbox.left &&
        this.hitbox.position.y + this.hitbox.size.y / 2 >= hitbox.top &&
        this.hitbox.position.y + this.hitbox.size.y / 2 <= hitbox.bottom
      )
        hit = true;

      if (
        !hit &&
        (this.direction === Direction.UP ||
          this.direction === Direction.DOWN) &&
        this.hitbox.top <= hitbox.bottom &&
        this.hitbox.bottom >= hitbox.top &&
        this.hitbox.position.x + this.hitbox.size.x / 2 >= hitbox.left &&
        this.hitbox.position.x + this.hitbox.size.x / 2 <= hitbox.right
      )
        hit = true;

      if (hit) {
        if (!(cell instanceof EmptyCell)) {
          // console.log(`Process the arrow with`, cell);
          cell.processArrow(this);
          this.updateHitbox();
        }
      }
    }

    // Check for Entities collision
    for (const entity of this.game.entities) {
      if (this.direction === Direction.LEFT) {
        if (
          this.hitbox.left <= entity.right &&
          this.hitbox.right >= entity.left &&
          entity.position.y + entity.size.y / 2 >= this.hitbox.top &&
          entity.position.y + entity.size.y / 2 <= this.hitbox.bottom
        ) {
          console.log(`Killed`, entity);
          entity.destroy();
        }
      }
    }

    // Check for screen leaving
    if (
      (this.direction === Direction.LEFT && this.right < 0) ||
      (this.direction === Direction.DOWN &&
        this.top >= this.game.board.bottom) ||
      (this.direction === Direction.UP && this.bottom < 0) ||
      (this.direction === Direction.RIGHT &&
        this.left >= this.game.board.right)
    )
      return this.destroy();
  }

  /**
   * Returns rotated coordinates by angle relates to arrow direction.
   */
  private _r(coord: Vec2): Vec2 {
    let deg = null;

    switch (this.direction) {
      case Direction.LEFT:
        deg = 0;
        break;
      case Direction.DOWN:
        deg = 90;
        break;
      case Direction.RIGHT:
        deg = 180;
        break;
      case Direction.UP:
        deg = 270;
        break;
      default:
        throw new Error(`Unknown direction ${this.direction}`);
    }

    const centerPoint = this.position.plus(this.size.divide(2));

    return coord.rotateAroundThePoint(deg, centerPoint);
  }

  render() {
    const { ctx } = this;

    // Fucking typescript's spread operator problem :/
    function moveTo(coords: Vec2): void {
      ctx.moveTo(coords.x, coords.y);
    }

    function lineTo(coords: Vec2): void {
      ctx.lineTo(coords.x, coords.y);
    }

    ctx.strokeStyle = 'white';
    ctx.beginPath();

    // Horizonral
    moveTo(this._r(this.position.plus(new Vec2(0, this.size.y / 2))));
    lineTo(
      this._r(this.position.plus(new Vec2(this.size.x, this.size.y / 2))),
    );
    // Left bottom
    moveTo(this._r(this.position.plus(new Vec2(0, this.size.y / 2))));
    lineTo(
      this._r(
        this.position.plus(
          new Vec2(this.size.x / 2, this.size.y - this.scale),
        ),
      ),
    );
    // Left top
    moveTo(this._r(this.position.plus(new Vec2(0, this.size.y / 2))));
    lineTo(
      this._r(this.position.plus(new Vec2(this.size.x / 2, this.scale))),
    );
    // Right bottom
    moveTo(
      this._r(
        this.position.plus(new Vec2(this.size.x / 1.5, this.size.y / 2)),
      ),
    );
    lineTo(this._r(this.position.plus(new Vec2(this.size.x, this.scale))));
    // Right top
    moveTo(
      this._r(
        this.position.plus(new Vec2(this.size.x / 1.5, this.size.y / 2)),
      ),
    );
    lineTo(
      this._r(
        this.position.plus(
          new Vec2(this.size.x, this.size.y - this.scale),
        ),
      ),
    );
    ctx.stroke();
  }

  renderhitbox() {
    this.ctx.fillStyle = `rgb(${random(0, 255)}, ${random(
      0,
      255,
    )}, ${random(0, 255)})`;
    this.ctx.fillRect(
      this.hitbox.position.x,
      this.hitbox.position.y,
      this.hitbox.size.x,
      this.hitbox.size.y,
    );
  }
}
