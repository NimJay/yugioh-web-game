import { cards } from "./cards";

interface Card {
  // id is not a unique identifier for a card.
  // The unique identifier is the combination of id and rarity.
  // For instance, the "Ultra Rare" version of a card has the
  // same id as the "Common" version of the same card.
  id: string;
  name: string;
  description: string;
  attack: number;
  defense: number;
  level: number;
  type: string;
  attribute: string;
  race: string;
  imageUrl: string;
  treatedAs: string;
  hasEffect: boolean;
  // If undefined, assume 'Common' rarity
  rarity?: 'Common' // No shine
    | 'Rare' // Shiny name
    | 'Super Rare' // Shiny image
    | 'Ultra Rare' // Shiny image and shiny name
    | 'Secret Rare'; // Extra shiny image and shiny name
}

function getCommonCardById(cardId: string): Card {
  return cards.find(card => card.id === cardId);
}

export { Card, getCommonCardById };
