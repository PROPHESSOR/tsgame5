import Screen from '../Screen';
import UI from '../UI';
import { Vec2 } from '../Math';
import Button from './Components/Button';
import { eState } from './Component';
import brushes from '../Cells/Brushes';
import ButtonWithAmount from './Components/ButtonWithAmount';

const OFFSET_X = 25;
const OFFSET_Y = 25;
const BTN_SIZE = 25;
const BTN_OFFSET = 2.5;
const BTN_GAP = 5;

export default class TileSelector extends Screen {
  position: Vec2;
  size: Vec2;
  components: Array<ButtonWithAmount>;

  constructor(ui: UI) {
    super(ui);

    this.ui.game.on('level_loaded', () => this.updateBrushes());
    this.ui.game.on('level_unloaded', () => this.removeBrushes());
    this.ui.game.on('brush_update', () => this.updateBrushAmount());
  }

  private removeBrushes() {
    this.components = [];
  }

  updateBrushes() {
    let btnyposition = OFFSET_Y + BTN_GAP;

    for (const brushdef of this.ui.game.brushes) {
      const [brushname, amount] = brushdef;
      const brush = brushes[brushname];

      const btn = this.addBrushBtn(
        btnyposition,
        brush.brushName,
        brush.text,
      );

      if (amount !== -1) btn.amount = String(amount);
      btn.link = brushdef; // FIXME: It looks like a crutch

      btnyposition += BTN_SIZE + BTN_GAP;
    }

    this.size = new Vec2(30, btnyposition - BTN_SIZE);

    this.updateActiveButton();
  }

  private onBtnClick(brushName: string): void {
    this.ui.game.board.changeBrush(brushName);

    this.updateActiveButton();
  }

  private updateActiveButton(): void {
    this.components
      .filter(component => component instanceof Button)
      .forEach(btn =>
        btn.setState(
          btn.id === this.ui.game.board.brush
            ? eState.active
            : eState.normal,
        ),
      );
  }

  private updateBrushAmount(): void {
    this.components.forEach(component => {
      if (component.link[1] !== -1)
        component.amount = String(component.link[1]);
    });
  }

  private addBrushBtn(
    y: number,
    brushName: string,
    text: string = '',
  ): ButtonWithAmount {
    const brushbtn = this.generateButton(y);
    brushbtn.params.text = text;
    brushbtn.id = brushName;
    brushbtn.on('click', () => this.onBtnClick(brushName));
    this.components.push(brushbtn);
    return brushbtn;
  }

  private generateButton(y: number): ButtonWithAmount {
    const { board } = this.ui.game;

    const btnxposition = board.right + OFFSET_X + BTN_OFFSET;

    return new ButtonWithAmount(
      this.ui,
      new Vec2(btnxposition, y),
      new Vec2(BTN_SIZE, BTN_SIZE),
      undefined,
      undefined,
    );
  }

  render() {
    const { ctx } = this.ui;

    ctx.fillStyle = '#333333';
    ctx.fillRect(
      // FIXME: Some trash
      this.ui.game.board.right + OFFSET_X,
      OFFSET_Y,
      this.size.x,
      this.size.y,
    );

    this.components.forEach(component => component.render());
  }
}
