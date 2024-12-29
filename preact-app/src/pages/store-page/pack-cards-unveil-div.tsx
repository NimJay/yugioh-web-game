import { useState } from "preact/hooks";
import { Card } from "../../state/card";
import './pack-cards-unveil-div.css';
import { CurrentCardDiv } from "../../shared/current-card-div/current-card-div";

interface PackCardsUnveilDivProps {
  cardsToUnveil: Card[];
  onClose: () => void;
}

function PackCardsUnveilDiv(props: PackCardsUnveilDivProps) {
  const { cardsToUnveil, onClose } = props;
  const [currCard, setCurrentCard] = useState<Card>();
  const cardLis = cardsToUnveil.map((card) => {
    const imgSrc = `/public/cards/${card.id}.png`;
    return (
      <li
        onMouseOver={setCurrentCard.bind(null, card)}
        key={card.id}>
        <img src={imgSrc} alt={card.name} />
      </li>
    );
  });
  return (
    <div className="PackCardsUnveilDiv">
      <ul>
        {cardLis}
      </ul>
      <CurrentCardDiv card={currCard} />
      <button onClick={onClose}>
        Close
      </button>
    </div>
  );
}

export { PackCardsUnveilDiv };
