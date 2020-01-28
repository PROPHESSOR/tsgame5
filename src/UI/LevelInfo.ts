import Screen from '../Screen';
import UI from '../UI';
import { Vec2 } from '../Math';
import Button from './Components/Button';
import { eState } from './Component';
import brushes from '../Cells/Brushes';
import ButtonWithAmount from './Components/ButtonWithAmount';
import Label from './Components/Label';
import ToggleCell from '../Cells/ToggleCell';

const OFFSET_X = 25;
const OFFSET_Y = 25;
const BTN_SIZE = 25;
const BTN_OFFSET = 2.5;
const BTN_GAP = 5;

export default class LevelInfo extends Screen {
  position: Vec2;
  size: Vec2;
  components: Array<Label>;
  levelname: Label;
  triggers: Label; // `activated/all`

  constructor(ui: UI) {
    super(ui);
    this.levelname = new Label(
      ui,
      this.ui.game.board.topright.plus(new Vec2(-15, 5)),
      new Vec2(15, 5),
    );
    this.triggers = new Label(
      ui,
      this.ui.game.board.bottomright.plus(new Vec2(25, 0)),
      new Vec2(15, 5),
    );
    this.components.push(this.levelname, this.triggers);

    this.ui.game.on('level_loaded', ({ level }) => {
      this.onLevelLoad(level);
      this.onToggleCellToggle();
    });
    this.ui.game.on('togglecell_activated', () =>
      this.onToggleCellToggle(),
    );
  }

  private onLevelLoad(level) {
    this.levelname.params.text = level.name;
  }

  private onToggleCellToggle() {
    const all = this.ui.game.board.cells.filter(
      cell => cell instanceof ToggleCell,
    );
    const toggled = all.filter((cell: ToggleCell) => cell.state);

    this.triggers.params.text = `${toggled.length}/${all.length}`;
  }
}
