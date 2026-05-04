const { app, BrowserWindow, protocol } = require('electron');
const { createWindow } = require('./windows');
const { registerMusicHandlers } = require('./handlers');

protocol.registerSchemesAsPrivileged([
  { scheme: 'music', privileges: { bypassCSP: true, stream: true } }
]);

registerMusicHandlers();

app.whenReady().then(() => {
  protocol.handle('music', (request) => {
const rawPath = request.url.slice('music://'.length);
  
  // 2. Decodeer de URI component (lost %20 spaties op)
  let decodedPath = decodeURIComponent(rawPath);
  
  // 3. Normaliseer het pad: vervang alle backslashes door forward slashes
  // Dit is cruciaal voor Windows paden
  const normalizedPath = decodedPath.replace(/\\/g, '/');

  // 4. Gebruik net.fetch met het file:// protocol
  // We zorgen dat er exact drie slashes staan voor C:/...
  const finalUrl = `file:///${normalizedPath}`;
  
  return net.fetch(finalUrl);
  });

  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});