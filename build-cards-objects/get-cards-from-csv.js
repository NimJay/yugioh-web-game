const fs = require('fs');
const csv = require('csv-parser');

const CSV_FILE_PATH = 'cards.csv';

function csvRowToCard(row) {
  return {
    id: row.id,
    name: row.name,
    description: row.desc,
    attack: parseInt(row.atk),
    defense: parseInt(row.def),
    level: parseInt(row.level),
    type: row.type, // Examples: Flip Effect Monster, Trap Card, Fusion Monster, Spell Card
    attribute: row.attribute, // Examples: WATER, DARK, EARTH
    race: row.race, // Examples: Zombie, Fiend, Machine
    archectype: row.archectype, // Examples: Elemental HERO, Umi, Gravekeeper's, Harpie
    imageUrl: row.image_url,
    treatedAs: row.treated_as,
    hasEffect: row.has_effect === '1',
  };
}

function isBeforeYear(yyyyMmDd, year) {
  // Return false if yyyyMmDd is not a valid date
  if (!yyyyMmDd) {
    return false;
  }
  const date = new Date(yyyyMmDd);
  return date.getFullYear() < year;
}

function getCardsBeforeYear(callback, releaseYearMax) {
  const cards = [];
  fs.createReadStream(CSV_FILE_PATH)
    .pipe(csv())
    .on('data', (row) => {
      const releaseDate = row.ocg_date || row.tcg_date;
      if (isBeforeYear(releaseDate, releaseYearMax)) {
        cards.push(csvRowToCard(row));
      }
    })
    .on('end', () => {
      console.log(`Got ${cards.length} cards.`);
      if (typeof callback === 'function') {
        warnAboutInvalidities(cards);
        callback(cards);
      }
    });
}

// Synchro cards were released in 2008 🤮
function getCardsBefore2008(callback) {
  getCardsBeforeYear(callback, 2008);
}

function warnAboutInvalidities(cards) {
  console.log(`Checking for duplicate IDs.`);
  const idsMaps = new Map();
  for (const card of cards) {
    if (idsMaps.has(card.id)) {
      console.warn(`Duplicate id: ${card.id}`);
    }
    idsMaps.set(card.id, card);
  }
}

module.exports = { getCardsBefore2008 };
