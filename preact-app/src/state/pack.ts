import { Card, getCommonCardById } from "./card";
import { packs } from "./packs";

interface Pack {
  name: string; // The name is the unique identifier for a pack
  releaseYear: number;
  numOfCards: number;
  price: number;
  commonCardIds: string[];
  rareCardIds: string[];
  superRareCardIds: string[];
  ultraRareCardIds: string[];
  secretRareCardIds: string[];
}

function getPackByName(packName: string): Pack {
  return packs.find(pack => pack.name === packName);
}

function getAllCardsInPack(packName: string): Card[] {
  const pack = getPackByName(packName);
  const allCardsInPack: Card[] = [];
  for (const cardId of pack.commonCardIds) {
    const card = getCommonCardById(cardId);
    card.rarity = 'Common';
    allCardsInPack.push(card);
  }
  for (const cardId of pack.rareCardIds) {
    const card = getCommonCardById(cardId);
    card.rarity = 'Rare';
    allCardsInPack.push(card);
  }
  for (const cardId of pack.superRareCardIds) {
    const card = getCommonCardById(cardId);
    card.rarity = 'Super Rare';
    allCardsInPack.push(card);
  }
  for (const cardId of pack.ultraRareCardIds) {
    const card = getCommonCardById(cardId);
    card.rarity = 'Ultra Rare';
    allCardsInPack.push(card);
  }
  for (const cardId of pack.secretRareCardIds) {
    const card = getCommonCardById(cardId);
    card.rarity = 'Secret Rare';
    allCardsInPack.push(card);
  }
  return allCardsInPack;
}

export { Pack, getAllCardsInPack, getPackByName };
