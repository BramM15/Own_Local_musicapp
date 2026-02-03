const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  checkBestand: (pad) => ipcRenderer.invoke('lees-muziek-bestand', pad),
  getMetadata: (pad) => ipcRenderer.invoke('lees-muziek-metadata', pad)
});