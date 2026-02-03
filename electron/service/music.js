const fs = require('node:fs');
const { parseFile } = require('music-metadata');

const readMusicFile = async (filePath) => {
  try {
    const data = fs.readFileSync(filePath);
    return data;
  } catch (error) {
    console.error("Error reading file:", error);
    throw error;
  }
};

const readMusicMetadata = async (filePath) => {
  try {
    const metadata = await parseFile(filePath);
    return {
      title: metadata.common.title || 'Onbekend',
      artist: metadata.common.artist || 'Onbekend',
      duration: metadata.format.duration || 0,
      genre: metadata.common.genre || 'Onbekend'
    };
  } catch (error) {
    console.error("Error reading metadata:", error);
    throw error;
  }
};

module.exports = {
  readMusicFile,
  readMusicMetadata
};
