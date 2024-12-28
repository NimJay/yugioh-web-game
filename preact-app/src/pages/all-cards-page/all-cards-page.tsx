import { useState } from "preact/hooks";
import { AllCardsDiv } from "./all-cards-div";
import { CurrentCardDiv } from "../../components/current-card-div/current-card-div";
import "./all-cards-page.css";

function AllCardsPage() {
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

export { AllCardsPage };
