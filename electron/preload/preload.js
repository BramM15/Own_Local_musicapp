const { contextBridge, ipcRenderer } = require('electron');
// const { saveLibrary } = require('../service/storage');

contextBridge.exposeInMainWorld('electronAPI', {
  readMusicFile: (filePath) => ipcRenderer.invoke('read-music-file', filePath),
  readMusicMetadata: (filePath) => ipcRenderer.invoke('read-music-metadata', filePath),
  readMusicDirectory: (directoryPath) => ipcRenderer.invoke('read-music-directory', directoryPath),
  saveMusicPaths: (paths) => ipcRenderer.invoke('save-music-paths', paths),
  saveLibrary: (libraryData) => ipcRenderer.invoke('save-library', libraryData),
  loadMusicLibrary: () => ipcRenderer.invoke('load-music-library'),
});