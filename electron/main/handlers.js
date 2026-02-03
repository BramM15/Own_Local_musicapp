const { ipcMain } = require('electron');
const { readMusicFile, readMusicMetadata } = require('../service/music');

const registerMusicHandlers = () => {
  ipcMain.handle('lees-muziek-bestand', async (event, bestandsPad) => {
    return await readMusicFile(bestandsPad);
  });

  ipcMain.handle('lees-muziek-metadata', async (event, bestandsPad) => {
    return await readMusicMetadata(bestandsPad);
  });
};

module.exports = {
  registerMusicHandlers
};
