import { GameState } from "./game-state";
import { Card } from "./card";
import { getPackByName, getAllCardsInPack } from "./pack";

async function canBuyCardPack(
  gameState: GameState, packName: string,
): Promise<boolean> {
  const pack = getPackByName(packName);
  return gameState.numOfCoins >= pack.price;
}

async function buyCardPack(
  gameState: GameState, packName: string,
): Promise<Card[]> {
  if (!canBuyCardPack(gameState, packName)) {
    return [];
  }
  const pack = getPackByName(packName);
  gameState.updateNumOfCoins(gameState.numOfCoins - pack.price);
  const cards = openPack(packName);
  gameState.ownedCards.push(...cards);
  gameState.saveInLocalStorage();
  return cards;
}

function openPack(packName: string): Card[] {
  const allCardsInPack = getAllCardsInPack(packName);
  // Foiled means that the image is shiny
  // Get 8 non-foiled common or rare cards
  const nonFoiledCards = allCardsInPack.filter(isNonFoiledCard);
  const eightNonFoiledCards = [];
  for (let i = 0; i < 8; i++) {
    const randomIndex = Math.floor(Math.random() * nonFoiledCards.length);
    eightNonFoiledCards.push(nonFoiledCards[randomIndex]);
    nonFoiledCards.splice(randomIndex, 1);
  }
  // Each pack should come with at least 1 super/ulra/secret rare card
  const foiledCards = allCardsInPack.filter(isFoiledCard);
  const randomIndex = Math.floor(Math.random() * foiledCards.length);
  const foiledCard = foiledCards[randomIndex];
  return [...eightNonFoiledCards, foiledCard];
}

// Foiled means the image is shiny
// This function is useful because each pack contains at least 1 foiled card
function isFoiledCard(card: Card): boolean {
  const rarity = card.rarity;
  return ['Super Rare', 'Ultra Rare', 'Secret Rare'].includes(rarity);
}

// Foiled means the image is shiny
// This function is useful because each pack contains at least 1 foiled card
function isNonFoiledCard(card: Card): boolean {
  const rarity = card.rarity;
  return ['Common', 'Rare'].includes(rarity) || rarity === undefined;
}

export { buyCardPack, canBuyCardPack };
