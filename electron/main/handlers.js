const { ipcMain } = require('electron');
const { readMusicFile, readMusicMetadata } = require('../service/music');

const registerMusicHandlers = () => {
  ipcMain.handle('read-music-file', async (event, filePath) => {
    return await readMusicFile(filePath);
  });

  ipcMain.handle('read-music-metadata', async (event, filePath) => {
    return await readMusicMetadata(filePath);
  });

  // ipcMain.handle('read-music-directory', async (event, directoryPath) => {
  //   return await readMusicDirectory(directoryPath);
  // });
};

module.exports = {
  registerMusicHandlers
};
