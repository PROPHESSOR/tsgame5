import Button from './Button';
import Label from './Label';
import { Vec2 } from '../../Math';
import { eState } from '../Component';

export default class ButtonWithAmount extends Button {
  label: Label;
  _amount: string;

  get amount(): string {
    return this._amount;
  }

  set amount(amount: string) {
    this._amount = amount;
    if (amount === '0') {
      this.setState(eState.disabled);
    } else if (this.state === eState.disabled) {
      this.setState(eState.normal);
    }
  }

  constructor(ui, position: Vec2, size: Vec2, params, theme) {
    super(ui, position, size, params, theme);
    this.amount = '';
    this.label = new Label(
      ui,
      position.plus(new Vec2(size.x - 8, size.y - 1)),
      size,
      params,
      theme,
    );
    this.label.theme.normal.font = '15px monospace';
  }

  render() {
    super.render();
    this.label.params.text = this.amount;
    this.label.render();
  }
}
