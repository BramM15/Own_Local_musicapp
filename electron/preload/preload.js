const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  readMusicFile: (filePath) => ipcRenderer.invoke('read-music-file', filePath),
  readMusicMetadata: (filePath) => ipcRenderer.invoke('read-music-metadata', filePath),
});