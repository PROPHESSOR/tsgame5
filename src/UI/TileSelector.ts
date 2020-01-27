import Screen from '../Screen';
import UI from '../UI';
import { Vec2 } from '../Math';
import Button from './Components/Button';
import { eState } from './Component';

const OFFSET_X = 25;
const OFFSET_Y = 25;
const BTN_SIZE = 25;
const BTN_OFFSET = 2.5;
const BTN_GAP = 5;

export default class TileSelector extends Screen {
  position: Vec2;
  size: Vec2;
  components: Array<Button>;

  constructor(ui: UI) {
    super(ui);

    let btnyposition = OFFSET_Y + BTN_GAP;
    this.addBrushBtn(btnyposition, 'EmptyCell');

    btnyposition += BTN_SIZE + BTN_GAP;
    this.addBrushBtn(btnyposition, 'WallCell', 'x');

    btnyposition += BTN_SIZE + BTN_GAP;
    this.addBrushBtn(btnyposition, 'RotateCellClockwise', '/');

    btnyposition += BTN_SIZE + BTN_GAP;
    this.addBrushBtn(btnyposition, 'RotateCellAntiClockwise', '\\');

    this.size = new Vec2(30, btnyposition + BTN_GAP);

    this.updateActiveButton();
  }

  private onBtnClick(brushName: string): void {
    this.ui.game.board.changeBrush(brushName);

    this.updateActiveButton();
  }

  private updateActiveButton(): void {
    this.components.forEach(
      btn => btn.setState(btn.id === this.ui.game.board.brush ? eState.active : eState.normal);
  }

  private addBrushBtn(
    y: number,
    brushName: string,
    text: string = '',
  ): void {
    const brushbtn = this.generateButton(y);
    brushbtn.params.text = text;
    brushbtn.id = brushName;
    brushbtn.on('click', () => this.onBtnClick(brushName));
    this.components.push(brushbtn);
  }

  private generateButton(y: number): Button {
    const { board } = this.ui.game;

    const btnxposition = board.right + OFFSET_X + BTN_OFFSET;

    return new Button(
      this.ui,
      new Vec2(btnxposition, y),
      new Vec2(BTN_SIZE, BTN_SIZE),
    );
  }

  // TODO: HOW TO USE it? .next()?
  *getNextBtnYPosition() {
    for (let i = 0; i < 10; i++) {
      yield OFFSET_Y + BTN_GAP * i;
    }
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
