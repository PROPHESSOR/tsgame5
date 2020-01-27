import { EventEmitter } from '../Utils';
import { Vec2 } from '../Math';
import Box from '../Box';
import UI from '../UI';
import {
  iThemeTextBlockProps,
  iThemeComponentProps,
} from './Themes/iTheme';

export enum eState {
  normal = 'normal',
  active = 'active',
  hover = 'hover',
  disabled = 'disabled',
}

export interface iComponentParams {
  visible: boolean;
  active: boolean;
  disabled: boolean;
  hover: boolean;
}

export const defaultComponentParams: iComponentParams = {
  visible: true,
  active: false,
  disabled: false,
  hover: false,
};

Object.freeze(defaultComponentParams);

/**
 * Used to manage Component hooks
 */
export interface iComponentAbilities {
  /**
   * Catch onMouseMove event and change to hover state
   */
  hover: boolean;
  /**
   * Catch onClick event and emit event `click`
   */
  click: boolean;
}

export const defaultComponentAbilities = {
  hover: false,
  click: true,
};

Object.freeze(defaultComponentAbilities);

export default abstract class Component extends EventEmitter
  implements iComponentParams {
  visible: boolean;
  active: boolean;
  disabled: boolean;
  hover: boolean;
  position: Vec2;
  size: Vec2;
  hitbox: Box | null;
  ui: UI;
  params: iComponentParams;
  theme: iThemeComponentProps;
  // stateTheme: iThemeBlockProps | iThemeTextProps | iThemeTextBlockProps;
  state: eState;
  abilities: iComponentAbilities;
  id: string;
  /**
   * Used to store a link to any object you want to link the component
   */
  link: any;

  constructor(
    ui: UI,
    position: Vec2,
    size: Vec2,
    hitbox: Box = null,
    params: iComponentParams = Object.assign({}, defaultComponentParams),
    theme: iThemeComponentProps,
  ) {
    super();
    this.ui = ui;
    this.position = position;
    this.size = size;
    this.hitbox = hitbox;
    this.params = params;
    this.abilities = Object.assign({}, defaultComponentAbilities);
    this.theme = theme;
    // stateTheme = Object.assign({}, theme.normal); // Shouldn't we use Object.assign here?
    this.state = eState.normal;
  }

  onClick(position: Vec2): boolean {
    if (!this.hitbox) return false;
    if (!this.abilities.click) return false;

    if (this.hitbox.checkInside(position)) {
      if (this.params.disabled) return true; // Catch the click
      this.emit('click');
      return true;
    }

    return false;
  }

  onMouseMove(position: Vec2): boolean {
    if (!this.hitbox) return false;
    if (!this.abilities.hover) return false;

    if (this.hitbox.checkInside(position)) {
      if (
        this.state === eState.hover ||
        this.state === eState.active ||
        this.state === eState.disabled
      )
        return true;
      this.setState(eState.hover);
      this.emit('hover');
    } else if (this.state === eState.hover) {
      this.setState(eState.normal);
    }

    return false;
  }

  get stateTheme(): iThemeTextBlockProps {
    const stateTheme: iThemeTextBlockProps = Object.assign(
      {},
      this.theme.normal,
    );

    // Apply diffs
    switch (this.state) {
      case eState.normal:
        break;
      case eState.active:
        Object.assign(stateTheme, this.theme.active);
        break;
      case eState.hover:
        Object.assign(stateTheme, this.theme.hover);
        break;
      case eState.disabled:
        Object.assign(stateTheme, this.theme.disabled);
        break;
      default:
        throw new Error(`Unknown state ${this.state}`);
    }

    return stateTheme;
  }

  setState(state: eState): void {
    this.state = state;
  }

  abstract render();
}
