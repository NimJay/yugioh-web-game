import { Card } from '../../state/card';
import './current-card-div.css';

interface CurrentCardDivProps {
  card?: Card;
}

function CurrentCardDiv (props: CurrentCardDivProps) {
  const { card } = props;
  if (!card) {
    return (<div className={`CurrentCardDiv`}></div>);
  }
  return (
    <div className={`CurrentCardDiv`}>
      <div className={`CurrentCardDivImageDiv`}>
        <img src={"/public/cards/" + card.id + ".png"} alt={card.name} />
      </div>
      <div>{card.name}</div>
      <div>{card.description}</div>
    </div>
  );
}

export { CurrentCardDiv };
