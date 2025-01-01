import { useState } from "preact/hooks";
import { OwnedCardsDiv } from "./owned-cards-div";
import { CurrentCardDiv } from "../../shared/current-card-div/current-card-div";
import { TopLeftHeader } from "../../shared/top-left-header/top-left-header";
import "./my-deck-page.css";
import { GameState } from "../../state/game-state";

interface MyDeckPageProps {
  gameState: GameState;
}

function MyDeckPage(props: MyDeckPageProps) {
  const { gameState } = props;
  const [currentCard, setCurrentCard] = useState(null);
  return (
    <div className={`MyDeckPage`}>
      <TopLeftHeader href="/" textBody="← Back to home page" />
      <div>
        <OwnedCardsDiv ownedCards={gameState.ownedCards} setCurrentCard={setCurrentCard} />
        <CurrentCardDiv card={currentCard} />
      </div>
    </div>
  );
}

export { MyDeckPage };
