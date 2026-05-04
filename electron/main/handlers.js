const { ipcMain } = require('electron');
const { readMusicFile, readMusicMetadata } = require('../service/music');
const { readMusicDirectory } = require('../service/readDirectory');
const { saveMusicPaths, loadMusicLibrary} = require('../service/storage');

const registerMusicHandlers = () => {
  ipcMain.handle('read-music-file', async (event, filePath) => {
    return await readMusicFile(filePath);
  });

  ipcMain.handle('read-music-metadata', async (event, filePath) => {
    return await readMusicMetadata(filePath);
  });

  ipcMain.handle('read-music-directory', async (event, directoryPath) => {
    return await readMusicDirectory(directoryPath);
  });

  ipcMain.handle('save-music-paths', async (event, paths) => {
    return await saveMusicPaths(paths);
  });

  ipcMain.handle('load-music-library', async () => {
    return await loadMusicLibrary();
  });
};

module.exports = {
  registerMusicHandlers
};
