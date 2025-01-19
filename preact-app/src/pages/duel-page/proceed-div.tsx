import { Component } from "preact";
import { Duel, Phase } from "../../state/duel";
import { registerOnChangeListener, unregisterOnChangeListener } from "../../state/on-change-listeners";
import "./proceed-div.css";

interface ProceedDivProps {
  duel: Duel;
}

interface ProceedDivState {
  phase: Phase;
}

class ProceedDiv extends Component<ProceedDivProps, ProceedDivState> {

  constructor(props: ProceedDivProps) {
    super(props);
    this.state = {
      phase: props.duel.currentPhase,
    };
    this.onClickProceed = this.onClickProceed.bind(this);
    this.onPhaseChange = this.onPhaseChange.bind(this);
  }

  componentDidMount() {
    registerOnChangeListener(
      "gameState.currentDuel.currentPhase",
      this.onPhaseChange,
    );
  }

  componentWillUnmount(): void {
    unregisterOnChangeListener(
      "gameState.currentDuel.currentPhase",
      this.onPhaseChange,
    );
  }

  onPhaseChange(newPhase: Phase) {
    this.setState({ phase: newPhase });
  }

  onClickProceed() {
    const { duel } = this.props;
    duel.enterNextPhase();
  }

  render() {
    const { duel } = this.props;
    const { phase } = this.state;
    // The user is always p1 (player 1).
    const isOpponentTurn = duel.currentTurnPlayer === duel.p2;
    if (isOpponentTurn
      || phase === Phase.DRAW
      || phase === Phase.STANDBY
      || phase === Phase.END) {
      return;
    }
    let text = "Enter battle phase";
    if (phase === Phase.BATTLE) {
      text = "End battle phase";
    }
    if (phase === Phase.MAIN_2) {
      text = "End turn";
    }
    return (
      <div className={`ProceedDiv`}>
        <button onClick={this.onClickProceed}>{text}</button>
      </div>
    );
  }

}

export { ProceedDiv };
