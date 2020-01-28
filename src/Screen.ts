import { EventEmitter } from './Utils';
import Component from './UI/Component';
import UI from './UI';
import { Vec2 } from './Math';

/** Combines the UI Components to Screen (a layer)
 * @module Screen.ts
 */

export default abstract class Screen extends EventEmitter {
  components: Array<Component>;
  ui: UI;

  constructor(ui: UI) {
    super();
    this.ui = ui;
    this.components = [];
  }

  onClick(position: Vec2): boolean {
    for (const component of this.components.reverse()) {
      if (component.onClick(position)) return true;
    }

    return false;
  }

  onMouseMove(position: Vec2): boolean {
    for (const component of this.components.reverse()) {
      if (component.onMouseMove(position)) return true;
    }

    return false;
  }

  render() {
    this.components.reverse().forEach(component => component.render());
  }
}
