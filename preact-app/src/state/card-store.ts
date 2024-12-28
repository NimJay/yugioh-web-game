import { getAppState, saveAppState } from "./app-state";
import { Card } from "./card";
import { getPackByName, getAllCardsInPack } from "./pack";

async function canBuyCardPack(packName: string): Promise<boolean> {
  const appState = await getAppState();
  const pack = getPackByName(packName);
  return appState.numOfCoins >= pack.price;
}

async function buyCardPack(packName: string): Promise<Card[]> {
  if (!canBuyCardPack(packName)) {
    return [];
  }
  const appState = await getAppState();
  const pack = getPackByName(packName);
  appState.numOfCoins -= pack.price;
  const cards = openPack(packName);
  appState.ownedCards.push(...cards);
  await saveAppState();
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
