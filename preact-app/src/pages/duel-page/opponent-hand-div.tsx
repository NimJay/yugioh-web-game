import { Component } from "preact";
import { Card } from "../../state/card";
import './opponent-hand-div.css';
import { Duel } from "../../state/duel";
import { registerOnChangeListener, unregisterOnChangeListener } from "../../state/on-change-listeners";

interface OpponentHandDivProps {
  duel: Duel;
}

interface OpponentHandDivState {
  opponentHand: Card[];
}

class OpponentHandDiv extends Component<OpponentHandDivProps, OpponentHandDivState> {

  constructor(props: OpponentHandDivProps) {
    super(props);
    const { duel } = props;
    this.state = {
      opponentHand: duel.p1.hand,
    };
    this.onOpponentHandChange = this.onOpponentHandChange.bind(this);
  }

  componentDidMount(): void {
    registerOnChangeListener(
      // The opponent is always player 2 (p2).
      'gameState.currentDuel.p2.hand',
      this.onOpponentHandChange,
    );
  }

  componentWillUnmount(): void {
    unregisterOnChangeListener(
      // The opponent is always player 2 (p2).
      'gameState.currentDuel.p2.hand',
      this.onOpponentHandChange,
    );
  }

  onOpponentHandChange(opponentHand: Card[]): void {
    this.setState({ opponentHand });
  }

  render() {
    const { opponentHand } = this.state;
    const lis = opponentHand.map(() => (
      <li>
        <div>
          <img src="/public/card-back.png" alt="The back of a Yu-Gi-Oh card." />
        </div>
      </li>
    ));
    return (
      <div class="OpponentHandDiv">
        <ol>{lis}</ol>
      </div>
    );
  }

}

export { OpponentHandDiv };
