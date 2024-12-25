import { useState } from 'preact/hooks';
import { Card } from '../../state/card';
import { cards } from '../../state/cards';
import './all-cards-div.css';

interface AllCardsDivProps {
  setCurrentCard: (card: Card) => void;
}

function AllCardsDiv(props: AllCardsDivProps) {
  const [maxCardsToShow, setMaxCardsToShow] = useState(100);
  const { setCurrentCard } = props;
  const numOfCardsNotShown = cards.length - maxCardsToShow;
  const cardDivs = cards.map(
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
    <div className={`AllCardsDiv`}>
      {cardDivs}
      {numOfCardsNotShown > 0 && (
        <div className={`AllCardsDivShowMoreCardsDiv`}>
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

export { AllCardsDiv };
