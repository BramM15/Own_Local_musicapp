const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('node:path')
const fs = require('node:fs')
const { parseFile } = require('music-metadata')

const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    //TODO : check security issues with preload
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: false,
      contextIsolation: true,
      sandbox: true
    }
  })

  win.loadURL('http://localhost:5173')
}

ipcMain.handle('lees-muziek-bestand', async (event, bestandsPad) => {
  try {
    const data = fs.readFileSync(bestandsPad);
    return data; 
  } catch (error) {
    console.error("Fout bij het lezen van bestand:", error);
    throw error;
  }
});

ipcMain.handle('lees-muziek-metadata', async (event, bestandsPad) => {
  try {
    const metadata = await parseFile(bestandsPad);
    return {
      titel: metadata.common.title || 'Onbekend',
      kunstenaar: metadata.common.artist || 'Onbekend',
      duur: metadata.format.duration || 0, // in seconden
      genre: metadata.common.genre || 'Onbekend'
    };
  } catch (error) {
    console.error("Fout bij het lezen van metadata:", error);
    throw error;
  }
});

app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})

