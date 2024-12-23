const fs = require('fs');
const https = require('https');
const { getCardsBefore2008 } = require('./get-cards-from-csv');

const FOLDER_TO_SAVE_IMAGES = `../preact-app/src/assets/cards/`;
const MIN_CARD_INDEX = 0;
const MAX_CARD_INDEX = 3050; // There's only about 3044 cards before 2008 anyway

function downloadCardImages() {
  console.log(`Downloading card images...`);
  getCardsBefore2008((cards) => {
    const promises = cards.map((card, index) => {
      if (index < MIN_CARD_INDEX || index > MAX_CARD_INDEX) {
        return;
      }
      const imageFilePath = `${FOLDER_TO_SAVE_IMAGES}${card.id}.png`;
      const isAlreadyDownloaded = fs.existsSync(imageFilePath);
      if (isAlreadyDownloaded) {
        console.log(`Skipping ${card.id} (${card.name}). Already downloaded.`);
        return;
      }
      console.log(`Downloading card ${card.id} (${card.name})...`);
      // Download the image
      downloadImage(card.imageUrl, imageFilePath);
    });
    Promise.all(promises).then(() => {
      console.log(`Done.`);
    }).catch((err) => {
      console.error(`Failed to download card images. Error: ${err}`);
    });
  });
}

function downloadImage(sourceUrl, destFilePath) {
  return new Promise((resolve, reject) => {
    const fileWriteStream = fs.createWriteStream(destFilePath);
    https.get(sourceUrl, (response) => {
      if (response.statusCode !== 200) {
        reject(new Error(`Failed to download image. Status Code: ${response.statusCode}`));
        return;
      }
      response.pipe(fileWriteStream);
      fileWriteStream.on('finish', () => {
        fileWriteStream.close();
        resolve();
      });
      fileWriteStream.on('error', (err) => {
        fs.unlinkSync(destFilePath); // Delete the partially downloaded file
        reject(err);
      });
    }).on('error', (err) => {
      reject(err);
    });
  });
}

downloadCardImages();
