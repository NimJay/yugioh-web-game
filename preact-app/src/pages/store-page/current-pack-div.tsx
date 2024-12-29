import { Pack } from "../../state/pack";
import './current-pack-div.css';

interface CurrentPackDivProps {
  canBuyPack: boolean;
  pack?: Pack;
  onClickBuy: () => void;
}

function CurrentPackDiv({
  canBuyPack, pack, onClickBuy,
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
      <button disabled={canBuyPack} onClick={onClickBuy}>
        Buy
      </button>
    </div>
  );
}

export { CurrentPackDiv };
