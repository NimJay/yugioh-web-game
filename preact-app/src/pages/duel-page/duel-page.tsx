import { Component } from "preact";
import { Duel } from "../../state/duel";
import { GameState } from "../../state/game-state";
import { OpponentPickerDiv } from "./opponent-picker-div";
import { DuelDiv } from "./duel-div";

interface DuelPageProps {
  gameState: GameState;
}

interface DuelPageState {
  hasCurrentDuel: boolean;
}

class DuelPage extends Component<DuelPageProps, DuelPageState> {

  public constructor(props: DuelPageProps) {
    super(props);
    this.setState({ hasCurrentDuel: !!props.gameState.currentDuel });
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
    this.setState({ hasCurrentDuel: true });
  }

  public render() {
    const { hasCurrentDuel } = this.state;
    if (!hasCurrentDuel) {
      return (
        <div>
          <OpponentPickerDiv onDuelOpponent={this.onDuelOpponent} />
        </div>
      );
    }
    return (
      <DuelDiv gameState={this.props.gameState} />
    );
  }

}

export { DuelPage };
