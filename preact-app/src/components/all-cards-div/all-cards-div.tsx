import { Card } from '../../state/card';
import { cards } from '../../state/cards';
import './all-cards-div.css';

interface AllCardsDivProps {
  setCurrentCard: (card: Card) => void;
}

function AllCardsDiv (props: AllCardsDivProps) {
  const { setCurrentCard } = props;
  const cardDivs = cards.map(
    (card) => {
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
    </div>
  );
}

type CardDivProps = {
  card: Card;
  onClick: () => void;
};

function CardDiv (props: CardDivProps) {
  const { card, onClick } = props;
  return (
    <div className={`CardDiv`} onClick={onClick}>
      <img src={"/public/cards/" + card.id + ".png"} alt={card.name} />
    </div>
  );
}

export { AllCardsDiv };
