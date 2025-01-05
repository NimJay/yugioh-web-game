import { Pack } from "../../state/pack";
import './current-pack-div.css';

interface CurrentPackDivProps {
  canBuyPack: boolean;
  pack?: Pack;
  numOfCoinsOwned: number;
  onClickBuy: () => void;
}

function CurrentPackDiv({
  canBuyPack, pack, onClickBuy, numOfCoinsOwned,
}: CurrentPackDivProps) {
  if (!pack) {
    return <div className={`CurrentPackDiv`}></div>;
  }
  const packNameKebabCase = pack.name.replace(/ /g, "-").toLowerCase();
  const imgSrc = `/public/packs/${packNameKebabCase}.png`;
  return (
    <div className={`CurrentPackDiv`}>
      <img src={imgSrc} alt={pack.name} />
      <h2>{pack.name}</h2>
      <p>You have {numOfCoinsOwned} coins.</p>
      <button disabled={canBuyPack} onClick={onClickBuy}>
        Buy for {pack.price} coins.
      </button>
    </div>
  );
}

export { CurrentPackDiv };
