const fs = require('fs');
const path = require('path');

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
      commonCardIds: rawPack.Common || [],
      rareCardIds: rawPack.Rare || [],
      superRareCardIds: rawPack['Super Rare'] || [],
      ultraRareCardIds: rawPack['Ultra Rare'] || [],
      secretRareCardIds: rawPack['Secret Rare'] || [],
    }
    packs.push(pack);
  }
  return packs;
}

// Synchro cards were released in 2008 🤮
function getPacksBefore2008() {
  const packs = getPacksFromJson();
  return packs.filter(pack => pack.releaseYear < 2008);
}

module.exports = { getPacksBefore2008 };
