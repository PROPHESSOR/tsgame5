import Component, {
  iComponentParams,
  defaultComponentParams,
} from '../Component';
import UI from '../../UI';
import { Vec2 } from '../../Math';
import { iThemeComponentProps } from '../Themes/iTheme';
import DefaultTheme from '../Themes/DefaultTheme';

/* eslint react/require-render-return: 0 */

export interface iTextParams extends iComponentParams {
  text: string;
}

export const defaultTextParams: iTextParams = {
  ...defaultComponentParams,
  text: '',
};

Object.freeze(defaultTextParams);

export default class Label extends Component {
  params: iTextParams;

  constructor(
    ui: UI,
    position: Vec2,
    size: Vec2,
    params: iTextParams | undefined = Object.assign({}, defaultTextParams),
    theme: iThemeComponentProps = Object.assign({}, DefaultTheme.Text),
  ) {
    super(ui, position, size, null, params, theme);
    this.abilities.click = false;
    this.abilities.hover = false;
  }

  render() {
    const { ctx } = this.ui;

    ctx.fillStyle = this.stateTheme.color;
    ctx.font = this.stateTheme.font;
    ctx.fillText(this.params.text, this.position.x, this.position.y);
  }
}
