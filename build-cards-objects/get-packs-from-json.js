const fs = require('fs');
const path = require('path');

// Because some cards have multiple art variations, the packs.jsonc file
// sometimes uses IDs that are not in the cards.csv file.
// Example: 46986415 & 46986415 are both Dark Magician, but with different illustrations.
const CARD_ID_CONVERSIONS = [
  { from: '89631140', to: '89631139' },
  { from: '46986415', to: '46986421' },
  { from: '74677422', to: '74677427' },
  { from: '27911550', to: '27911549' },
  { from: '84080938', to: '84080939' },
  { from: '81172177', to: '81172176' },
  { from: '83555667', to: '83555666' },
  { from: '80193356', to: '80193355' },
  { from: '98502115', to: '98502113' },
  { from: '90740330', to: '90740329' },
  { from: '14878871', to: '14878872' },
  { from: '4376658', to: '4376659' },
  { from: '31764353', to: '31764354' },
  { from: '31887905', to: '31887906' },
  { from: '68881649', to: '68881650' },
  { from: '89943723', to: '89943724' },
  { from: '64335804', to: '64335805' },
  { from: '68540058', to: '68540059' },
  { from: '18144506', to: '18144507' },
];

function convertIdsInPack(pack) {
  pack.commonCardIds = pack.commonCardIds.map(convertId);
  pack.rareCardIds = pack.rareCardIds.map(convertId);
  pack.superRareCardIds = pack.superRareCardIds.map(convertId);
  pack.ultraRareCardIds = pack.ultraRareCardIds.map(convertId);
  pack.secretRareCardIds = pack.secretRareCardIds.map(convertId);
}

function convertId(cardId) {
  const conversion = CARD_ID_CONVERSIONS.find(conversion => conversion.from === cardId);
  return conversion ? conversion.to : cardId;
}

function getPacksFromJson() {
  const jsonFilePath = path.resolve(__dirname, 'packs.jsonc');
  const packsJsonString = fs.readFileSync(jsonFilePath, 'utf8');
  const rawPacks = JSON.parse(packsJsonString);
  const packs = [];
  // The JSON file does not contain an array, it contains an object
  // where keys looks like "LOB".
  for (const [_, rawPack] of Object.entries(rawPacks)) {
    const pack = {
      name: rawPack['name'].join(' '),
      releaseYear: parseInt(rawPack['release']),
      numOfCards: rawPack['#cards'],
      price: 20.00, // TODO: Consider varying prices
      commonCardIds: rawPack.Common || [],
      rareCardIds: rawPack.Rare || [],
      superRareCardIds: rawPack['Super Rare'] || [],
      ultraRareCardIds: rawPack['Ultra Rare'] || [],
      secretRareCardIds: rawPack['Secret Rare'] || [],
    }
    convertIdsInPack(pack);
    packs.push(pack);
  }
  return packs;
}

function removePackWithName(packs, name) {
  return packs.filter(pack => pack.name !== name);
}

// Synchro cards were released in 2008 🤮
function getPacksBefore2008() {
  let packs = getPacksFromJson();
  // Even though these two packs are from 2007,
  // they contain cards with 2008 OCG (Official Card Game) release dates.
  // We would face a similar issues with a different set of packs if
  // we used TCG (Trading Card Game) release dates.
  // OCG = Japan/Asia, TCG = North America/Europe/other
  packs = removePackWithName(packs, "Gladiator's Assault");
  packs = removePackWithName(packs, "Tactical Evolution");
  return packs.filter(pack => pack.releaseYear < 2008);
}

module.exports = { getPacksBefore2008 };
