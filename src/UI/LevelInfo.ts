import Screen from '../Screen';
import UI from '../UI';
import { Vec2 } from '../Math';
import Label from './Components/Label';
import ToggleCell from '../Cells/ToggleCell';

const OFFSET_LEVELNAME = new Vec2(-15, 5);
const OFFSET_TOGGLECELLS = new Vec2(25, 0);

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
      this.ui.game.board.topright.plus(OFFSET_LEVELNAME),
      new Vec2(15, 5),
    );
    this.triggers = new Label(
      ui,
      this.ui.game.board.bottomright.plus(OFFSET_TOGGLECELLS),
      new Vec2(15, 5),
    );
    this.components.push(this.levelname, this.triggers);

    this.ui.game.on('level_loaded', ({ level }) => {
      this.onLevelLoad(level);
      this.onToggleCellToggle();
    });
    this.ui.game.on('togglecell_toggle', () => this.onToggleCellToggle());
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
