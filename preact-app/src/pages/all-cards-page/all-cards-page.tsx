import { useState } from "preact/hooks";
import { AllCardsDiv } from "./all-cards-div";
import { CurrentCardDiv } from "../../shared/current-card-div/current-card-div";
import { TopLeftHeader } from "../../shared/top-left-header/top-left-header";
import "./all-cards-page.css";

function AllCardsPage() {
  const [currentCard, setCurrentCard] = useState(null);
	return (
    <div className={`AllCardsPage`}>
      <TopLeftHeader href="/" textBody="← Back to home page" />
      <div>
        <AllCardsDiv setCurrentCard={setCurrentCard} />
        <CurrentCardDiv card={currentCard} />
      </div>
    </div>
  );
}

export { AllCardsPage };
