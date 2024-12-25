interface Card {
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
}

export { Card };
