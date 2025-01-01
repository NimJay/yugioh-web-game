import { useState } from 'preact/hooks';
import { Card } from '../../state/card';
import './owned-cards-div.css';

interface OwnedCardsDivProps {
  ownedCards: Card[];
  setCurrentCard: (card: Card) => void;
}

function OwnedCardsDiv(props: OwnedCardsDivProps) {
  const [maxCardsToShow, setMaxCardsToShow] = useState(100);
  const { setCurrentCard, ownedCards } = props;
  const numOfCardsNotShown = ownedCards.length - maxCardsToShow;
  const cardDivs = ownedCards.map(
    (card, index) => {
      if (index >= maxCardsToShow) {
        return null;
      }
      return (
        <CardDiv
          card={card}
          onClick={setCurrentCard.bind(null, card)} />
      );
    }
  );
  return (
    <div className={`OwnedCardsDiv`}>
      {cardDivs}
      {numOfCardsNotShown > 0 && (
        <div className={`OwnedCardsDivShowMoreCardsDiv`}>
          <button
            onClick={setMaxCardsToShow.bind(null, maxCardsToShow + 100)}>
            Show mores cards
          </button>
        </div>
      )}
    </div>
  );
}

type CardDivProps = {
  card: Card;
  onClick: () => void;
};

function CardDiv(props: CardDivProps) {
  const { card, onClick } = props;
  return (
    <div className={`CardDiv`} onClick={onClick}>
      <img src={"/public/cards/" + card.id + ".png"} alt={card.name} />
    </div>
  );
}

export { OwnedCardsDiv };
