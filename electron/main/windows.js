const { app, BrowserWindow, Menu } = require('electron');
const path = require('node:path');

Menu.setApplicationMenu(null);

const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, '../preload/preload.js'),
      nodeIntegration: false,
      contextIsolation: true,
      sandbox: true
    }
  });

  Menu.setApplicationMenu(null);

  win.loadFile(path.join(app.getAppPath(), 'musicapp/dist/index.html'))
    .catch(e => console.error("Fout bij laden:", e));

  return win;
};

module.exports = {
  createWindow
};
