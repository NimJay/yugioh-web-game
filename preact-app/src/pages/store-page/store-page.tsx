import { TopLeftHeader } from "../../shared/top-left-header/top-left-header";
import { getPackByName, Pack } from "../../state/pack";
import "./store-page.css";
import { Component } from 'preact';
import { Card } from "../../state/card";
import { CurrentPackDiv } from "./current-pack-div";
import { GameState } from "../../state/game-state";
import { PackCardsUnveilDiv } from "./pack-cards-unveil-div";
import { buyCardPack } from "../../state/card-store";
import { registerOnChangeListener, unregisterOnChangeListener } from "../../state/on-change-listeners";

interface StorePageProps {
  gameState: GameState;
}

interface StorePageState {
  currPack?: Pack;
  cardsJustPurchasedToUnveil: Card[];
  numOfCoins: number;
}

class StorePage extends Component<StorePageProps, StorePageState> {

  constructor(props: StorePageProps) {
    super();
    this.state = {
      cardsJustPurchasedToUnveil: [],
      numOfCoins: props.gameState.numOfCoins,
    };
    this.onClickBuyCurrPack = this.onClickBuyCurrPack.bind(this);
    this.onClickBuy = this.onClickBuy.bind(this);
    this.onClosePackCardsUnveilDiv = this.onClosePackCardsUnveilDiv.bind(this);
    this.onNumberOfCoinsChange = this.onNumberOfCoinsChange.bind(this);
  }

  componentDidMount(): void {
    registerOnChangeListener('gameState.numOfCoins', this.onNumberOfCoinsChange);
  }

  componentWillUnmount(): void {
    unregisterOnChangeListener('gameState.numOfCoins', this.onNumberOfCoinsChange);
  }

  onNumberOfCoinsChange(numOfCoins: number) {
    this.setState({ numOfCoins });
  }

  onClosePackCardsUnveilDiv() {
    this.setState({ cardsJustPurchasedToUnveil: [] });
  }

  async onClickBuy(packName: string) {
    const { gameState } = this.props;
    if (!gameState) {
      return;
    }
    const cards = await buyCardPack(gameState, packName);
    this.setState({ cardsJustPurchasedToUnveil: cards });
  }

  async onClickBuyCurrPack() {
    const { currPack } = this.state;
    if (!currPack) {
      return;
    }
    await this.onClickBuy(currPack.name);
  }

  render() {
    const {
      currPack, cardsJustPurchasedToUnveil, numOfCoins,
    } = this.state;

    // TODO: Implement pack unlocking logic
    const unlockedPacks = [
      getPackByName("Legend of Blue Eyes White Dragon"),
      getPackByName("Metal Raiders"),
    ];

    const packDivs = unlockedPacks.map((pack) => {
      return (
        <PackLi
          pack={pack}
          key={pack.name}
          onClick={() => this.setState({ currPack: pack })}
        />
      );
    });

    return (
      <div className={`StorePage`}>
        <TopLeftHeader href="/" textBody="← Back to home page" />
        <div>
          <ol className={`StorePagePacksOl`}>{packDivs}</ol>
          <CurrentPackDiv
            pack={currPack}
            canBuyPack={false}
            onClickBuy={this.onClickBuyCurrPack}
            numOfCoinsOwned={numOfCoins} />
        </div>
        {cardsJustPurchasedToUnveil.length > 0 && (
          <PackCardsUnveilDiv
            cardsToUnveil={cardsJustPurchasedToUnveil}
            onClose={this.onClosePackCardsUnveilDiv} />)}
      </div>
    );
  }
}

interface PackLiProps {
  pack: Pack;
  onClick: () => void;
}

function PackLi({ pack, onClick }: PackLiProps) {
  const packNameKebabCase = pack.name.replace(/ /g, "-").toLowerCase();
  const imgSrc = `/public/packs/${packNameKebabCase}.png`;
  return (
    <li
      className={`PackDiv`}
      onClick={onClick}>
      <img src={imgSrc} alt={pack.name} />
    </li>
  );
}

export { StorePage };
