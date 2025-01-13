/*
Once the user has selected their opponent, we render the <DuelDiv>.
The <DuelDiv> takes up the entire page.
*/

import { Component } from "preact";
import { GameState } from "../../state/game-state";
import "./duel-div.css";
import { CurrentCardDiv } from "../../shared/current-card-div/current-card-div";
import { cards } from "../../state/cards";

interface DuelDivProps {
  gameState: GameState;
}

class DuelDiv extends Component<DuelDivProps> {
  render() {
    return (
      <div class="DuelDiv">
        <DuelHeaderDiv />
        <div class="DuelMiddleDiv">
          <PlaymatsDiv />
          <CurrentCardDiv card={cards[321]} />
        </div>
        <div class="DuelFooterDiv">
          <HandDiv />
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

function HandDiv() {
  return (
    <div class="HandDiv">
      HandDiv
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

function PlaymatsDiv() {
  return (
    <div class="PlaymatsDiv">
      PlaymatsDiv
    </div>
  );
}

export { DuelDiv };
