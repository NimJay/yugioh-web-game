/*
Once the user has selected their opponent, we render the <DuelDiv>.
The <DuelDiv> takes up the entire page.
*/

import { Component } from "preact";
import "./duel-div.css";
import { CurrentCardDiv } from "../../shared/current-card-div/current-card-div";
import { Card } from "../../state/card";
import { CurrentEventDiv } from "./current-event-div";
import { Duel } from "../../state/duel";
import { HandDiv } from "./hand-div";

interface DuelDivProps {
  duel: Duel;
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

  componentDidMount() {
    const { duel } = this.props;
    duel.resumeDuel();
  }

  componentWillUnmount(): void {
    const { duel } = this.props;
    duel.pauseDuel();
  }

  render() {
    const { duel } = this.props;
    const { currentCard } = this.state;
    if (!duel) {
      return <div>Something went wrong. Missing duel.</div>;
    }
    return (
      <div class="DuelDiv">
        <DuelHeaderDiv />
        <div class="DuelMiddleDiv">
          <PlaymatsDiv duel={duel} />
          <CurrentCardDiv card={currentCard} />
        </div>
        <div class="DuelFooterDiv">
          <HandDiv
            duel={duel}
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

function ProceedDiv() {
  return (
    <div class="ProceedDiv">
      ProceedDiv
    </div>
  );
}

function PlaymatsDiv(props: { duel: Duel }) {
  const { duel } = props;
  return (
    <div class="PlaymatsDiv">
      PlaymatsDiv
      <CurrentEventDiv duel={duel} />
    </div>
  );
}

export { DuelDiv };
