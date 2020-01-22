import Component, {
  iComponentParams,
  defaultComponentParams,
} from '../Component';
import UI from '../../UI';
import { Vec2 } from '../../Math';
import Box from '../../Box';
import { iThemeComponentProps } from '../Themes/iTheme';
import DefaultTheme from '../Themes/DefaultTheme';

/* eslint react/require-render-return: 0 */

export interface iButtonParams extends iComponentParams {
  background: string;
  color: string;
  borderSize: number;
  borderColor: string;
  text: string;
  font: string;
}

export const defaultButtonParams: iButtonParams = {
  ...defaultComponentParams,
  background: 'black',
  color: 'red',
  borderSize: 1,
  borderColor: 'red',
  text: '',
  font: '20px monospace',
};

Object.freeze(defaultButtonParams);

export default class Button extends Component {
  params: iButtonParams;

  constructor(
    ui: UI,
    position: Vec2,
    size: Vec2,
    params: iButtonParams | undefined = Object.assign(
      {},
      defaultButtonParams,
    ),
    theme: iThemeComponentProps = Object.assign({}, DefaultTheme.Button),
  ) {
    super(ui, position, size, new Box(position, size), params, theme);
    this.abilities.hover = true;
    this.on('hover', () => console.log('btn.on hover'));
  }

  render() {
    const { ctx } = this.ui;

    ctx.fillStyle = this.stateTheme.background;
    ctx.fillRect(
      this.position.x,
      this.position.y,
      this.size.x,
      this.size.y,
    );
    ctx.strokeStyle = this.stateTheme.borderColor;
    ctx.strokeRect(
      this.position.x,
      this.position.y,
      this.size.x,
      this.size.y,
    ); // TODO: Use borderSize

    const textWidth = this.params.text.length;

    ctx.fillStyle = this.stateTheme.color;
    ctx.font = this.stateTheme.font;
    ctx.fillText(
      this.params.text,
      this.position.x + this.size.x / 2 - textWidth * 5,
      this.position.y + this.size.y / 2 + 5,
      // this.size.x,
    );
  }
}
