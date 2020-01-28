import { Vec2 } from './Math';
import Screen from './Screen';
import TileSelector from './UI/TileSelector';
import Game from './Game';
import LevelInfo from './UI/LevelInfo';

export const Screens = {
  TileSelector: TileSelector,
  LevelInfo: LevelInfo,
};

export default class UI {
  game: Game;
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  size: Vec2;
  layers: Array<Screen>;

  constructor(game: Game, UIcanvas: HTMLCanvasElement, size: Vec2) {
    this.game = game;
    this.canvas = UIcanvas;
    this.ctx = this.canvas.getContext('2d', { alpha: true });
    this.size = size;
    this.layers = [];
    this.layers.push(new TileSelector(this)); // FIXME:
    this.layers.push(new LevelInfo(this)); // FIXME:

    window.addEventListener('mousemove', event =>
      this.onMouseMove(new Vec2(event.offsetX, event.offsetY)),
    );
  }

  onClick(position: Vec2): boolean {
    for (const layer of this.layers.reverse()) {
      if (layer.onClick(position)) return true;
    }

    return false;
  }

  onMouseMove(position: Vec2): boolean {
    for (const layer of this.layers.reverse()) {
      if (layer.onMouseMove(position)) return true;
    }

    return false;
  }

  render() {
    this.ctx.clearRect(0, 0, this.size.x, this.size.y);

    this.layers.forEach(layer => layer.render());
  }
}
