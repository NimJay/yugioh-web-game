import { Component } from "preact";
import { Card } from "../../state/card";
import './hand-div.css';
import { Duel } from "../../state/duel";
import { registerOnChangeListener, unregisterOnChangeListener } from "../../state/on-change-listeners";

interface HandDivProps {
  duel: Duel;
  onMouseEnterCard: (card: Card) => void;
}

interface HandDivState {
  hand: Card[];
}

class HandDiv extends Component<HandDivProps, HandDivState> {

  constructor(props: HandDivProps) {
    super(props);
    this.state = {
      hand: props.duel.p1.hand,
    };
    this.onHandChange = this.onHandChange.bind(this);
  }

  componentDidMount(): void {
    registerOnChangeListener(
      // The user is always player 1 (p1).
      'gameState.currentDuel.p1.hand',
      this.onHandChange,
    );
  }

  componentWillUnmount(): void {
    unregisterOnChangeListener(
      // The user is always player 1 (p1).
      'gameState.currentDuel.p1.hand',
      this.onHandChange,
    );
  }

  onHandChange(hand: Card[]): void {
    this.setState({ hand });
  }

  render() {
    const { onMouseEnterCard } = this.props;
    const { hand } = this.state;
    const HandCardLis = hand.map((card) => (
      <HandCardLi
        card={card}
        onMouseEnter={() => onMouseEnterCard(card)} />
    ));
    return (
      <div class="HandDiv">
        <ol>
          {HandCardLis}
        </ol>
      </div>
    );
  }

}

function HandCardLi(props: { card: Card, onMouseEnter: () => void }) {
  const { card, onMouseEnter } = props;
  return (
    <li class="HandCardLi">
      <img
        src={"/public/cards/" + card.id + ".png"}
        alt={card.name}
        onMouseEnter={onMouseEnter} />
    </li>
  );
}

export { HandDiv };
