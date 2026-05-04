const fs = require('node:fs');
const path = require('node:path');

const getAllMusicFiles = (directoryPath) => {
  let results = [];
  const list = fs.readdirSync(directoryPath);
  const musicExtensions = ['.mp3', '.flac', '.wav', '.aac', '.m4a', '.ogg'];

  list.forEach((file) => {
    const filePath = path.join(directoryPath, file);
    const stat = fs.statSync(filePath);

    if (stat && stat.isDirectory()) {
      results = results.concat(getAllMusicFiles(filePath));
    } else {
      const ext = path.extname(filePath).toLowerCase();
      if (musicExtensions.includes(ext)) {
        results.push(filePath);
      }
    }
  });

  return results;
};

const readMusicDirectory = async (directoryPath) => {
  try {
    return getAllMusicFiles(directoryPath);
  } catch (error) {
    console.error("Error reading directory recursively:", error);
    throw error;
  }
};

module.exports = {
  readMusicDirectory
};