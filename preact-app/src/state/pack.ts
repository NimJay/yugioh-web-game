interface Pack {
  name: string; // The name is the unique identifier for a pack
  releaseYear: number;
  numOfCards: number;
  commonCardIds: string[];
  rareCardIds: string[];
  superRareCardIds: string[];
  ultraRareCardIds: string[];
  secretRareCardIds: string[];
}

export { Pack };
