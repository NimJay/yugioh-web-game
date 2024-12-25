import { useState } from "preact/hooks";
import { AllCardsDiv } from "../../components/all-cards-div/all-cards-div";
import { CurrentCardDiv } from "../../components/current-card-div/current-card-div";
import "./all-cards-page.css";

function AllCards() {
  const [currentCard, setCurrentCard] = useState(null);
	return (
    <div className={`AllCardsPage`}>
      <header>
        <a href="/">← Back to home page</a>
      </header>
      <div>
        <AllCardsDiv setCurrentCard={setCurrentCard} />
        <CurrentCardDiv card={currentCard} />
      </div>
    </div>
  );
}

export { AllCards };
