const { app, BrowserWindow, protocol } = require('electron');
const path = require('node:path');
const { createWindow } = require('./windows');
const { registerMusicHandlers } = require('./handlers');

protocol.registerSchemesAsPrivileged([
  {
    scheme: 'music',
    privileges: {
      bypassCSP: true,
      stream: true,
      standard: true,
      secure: true,
      supportFetchAPI: true
    }
  }
]);

registerMusicHandlers();

app.whenReady().then(() => {
  protocol.registerFileProtocol('music', (request, callback) => {
    const encodedPath = request.url.slice('music://'.length);
    const decodedPath = decodeURIComponent(encodedPath);
    const normalizedPath = path.normalize(decodedPath);

    console.log('Backend probeert te laden:', normalizedPath);
    callback({ path: normalizedPath });
  });

  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});