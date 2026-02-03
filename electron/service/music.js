const fs = require('node:fs');
const { parseFile } = require('music-metadata');

const readMusicFile = async (bestandsPad) => {
  try {
    const data = fs.readFileSync(bestandsPad);
    return data;
  } catch (error) {
    console.error("Fout bij het lezen van bestand:", error);
    throw error;
  }
};

const readMusicMetadata = async (bestandsPad) => {
  try {
    const metadata = await parseFile(bestandsPad);
    return {
      title: metadata.common.title || 'Onbekend',
      artist: metadata.common.artist || 'Onbekend',
      duration: metadata.format.duration || 0,
      genre: metadata.common.genre || 'Onbekend'
    };
  } catch (error) {
    console.error("Fout bij het lezen van metadata:", error);
    throw error;
  }
};

module.exports = {
  readMusicFile,
  readMusicMetadata
};
