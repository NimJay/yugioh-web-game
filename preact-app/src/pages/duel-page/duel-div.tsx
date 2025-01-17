/*
Once the user has selected their opponent, we render the <DuelDiv>.
The <DuelDiv> takes up the entire page.
*/

import { Component } from "preact";
import { GameState } from "../../state/game-state";
import "./duel-div.css";
import { CurrentCardDiv } from "../../shared/current-card-div/current-card-div";
import { Card } from "../../state/card";

interface DuelDivProps {
  gameState: GameState;
}

interface DuelDivState {
  currentCard?: Card;
}

class DuelDiv extends Component<DuelDivProps, DuelDivState> {

  constructor(props: DuelDivProps) {
    super(props);
    this.state = {};
    this.onSetCurrentCard = this.onSetCurrentCard.bind(this);
  }

  onSetCurrentCard(card: Card) {
    this.setState({ currentCard: card });
  }

  render() {
    const { gameState } = this.props;
    const { currentCard } = this.state;
    if (!gameState.currentDuel) {
      return <div>Something went wrong. Missing currentDuel.</div>;
    }
    return (
      <div class="DuelDiv">
        <DuelHeaderDiv />
        <div class="DuelMiddleDiv">
          <PlaymatsDiv />
          <CurrentCardDiv card={currentCard} />
        </div>
        <div class="DuelFooterDiv">
          <HandDiv
            hand={gameState.currentDuel.p1.hand}
            onMouseEnterCard={this.onSetCurrentCard} />
          <ProceedDiv />
        </div>
      </div>
    );
  }
}

function DuelHeaderDiv() {
  return (
    <div class="DuelHeaderDiv">
      DuelHeader
    </div>
  );
}

function HandDiv(props: { hand: Card[], onMouseEnterCard: (card: Card) => void }) {
  const { hand, onMouseEnterCard } = props;
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

function ProceedDiv() {
  return (
    <div class="ProceedDiv">
      ProceedDiv
    </div>
  );
}

function PlaymatsDiv() {
  return (
    <div class="PlaymatsDiv">
      PlaymatsDiv
    </div>
  );
}

export { DuelDiv };
