// const fs = require('node:fs');
// const { parseFile } = require('music-metadata');

// const readMusicDirectory = async (directoryPath) => {
//   try {
//     const files = fs.readdirSync(directoryPath);
//     const musicFiles = files.filter(file => {
//       const ext = file.split('.').pop().toLowerCase();
//       return ['mp3', 'flac', 'wav', 'aac'].includes(ext);
//     });
//     return musicFiles;
//   } catch (error) {
//     console.error("Error reading directory:", error);
//     throw error;
//   }
// };

// module.exports = {
//   readMusicDirectory
// };