import { Component } from "preact";
import { Duel } from "../../state/duel";
import { GameState } from "../../state/game-state";
import { OpponentPickerDiv } from "./opponent-picker-div";
import { DuelDiv } from "./duel-div";

interface DuelPageProps {
  gameState: GameState;
}

interface DuelPageState {
  currentDuel?: Duel;
}

class DuelPage extends Component<DuelPageProps, DuelPageState> {

  public constructor(props: DuelPageProps) {
    super(props);
    this.onDuelOpponent = this.onDuelOpponent.bind(this);
  }

  onDuelOpponent(opponentName: string) {
    const { gameState } = this.props;
    // TODO: Support logic for more than just monster cards
    const isMonsterCard = (card) => ["Normal Monster", "Effect Monster"].includes(card.type);
    const ownedMonsterCards = gameState.ownedCards.filter(isMonsterCard);
    const ownedMonsterCardsClone = JSON.parse(JSON.stringify(ownedMonsterCards));
    const currentDuel = Duel.createNewDuel(
      "User",
      opponentName,
      ownedMonsterCards, // TODO: Support logic for other types of cards
      ownedMonsterCardsClone, // TODO: Build a deck for each opponent
    );
    gameState.currentDuel = currentDuel;
    this.setState({ currentDuel });
  }

  public render() {
    const { gameState } = this.props;
    const { currentDuel } = this.state;
    if (!currentDuel) {
      return (
        <div>
          <OpponentPickerDiv onDuelOpponent={this.onDuelOpponent} />
        </div>
      );
    }
    return (
      <DuelDiv duel={currentDuel} />
    );
  }

}

export { DuelPage };
