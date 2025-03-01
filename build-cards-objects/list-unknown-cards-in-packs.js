/**
 * @fileoverview This script lists all the unknown card IDs across all Packs.
 * In other words: which cards IDs in our list of Packs have no associated Card objects?
 * To run this script:
 * 1. Move into this folder.
 * 2. npm install
 * 3. node list-unknown-cards-in-packs.js
 */

const { getCardsBefore2008 } = require("./get-cards-from-csv");
const { getPacksBefore2008 } = require("./get-packs-from-json");

getCardsBefore2008((cards) => {
  const packs = getPacksBefore2008();
  const cardIds = new Set(cards.map((card) => card.id));
  const allUnknownIds = new Set();
  for (const pack of packs) {
    const allCardIdsInPack = [
      ...pack.commonCardIds,
      ...pack.rareCardIds,
      ...pack.superRareCardIds,
      ...pack.ultraRareCardIds,
      ...pack.secretRareCardIds,
    ];
    let unknownIdsInPack = new Set();
    for (const cardId of allCardIdsInPack) {
      if (!cardIds.has(cardId)) {
        console.warn(
          `Card ${cardId} in pack ${pack.name} is not in the cards list.`
        );
        unknownIdsInPack.add(cardId);
        allUnknownIds.add(cardId);
      }
    }
    console.log(`${unknownIdsInPack.size} unknown card(s) in pack: ${pack.name}\n`);
  }
  console.log(`Total number of distinct, unknown card IDs: ${allUnknownIds.size}`);
});
