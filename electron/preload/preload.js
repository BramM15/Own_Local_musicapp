const { contextBridge, ipcRenderer } = require('electron');
const { read } = require('original-fs');

contextBridge.exposeInMainWorld('electronAPI', {
  readMusicFile: (filePath) => ipcRenderer.invoke('read-music-file', filePath),
  readMusicMetadata: (filePath) => ipcRenderer.invoke('read-music-metadata', filePath),
  // readMusicDirectory: (directoryPath) => ipcRenderer.invoke('read-music-directory', directoryPath),
});