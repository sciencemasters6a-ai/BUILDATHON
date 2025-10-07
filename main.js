const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const path = require('path');
const fs = require('fs');

function writeLog(msg) {
  try { fs.appendFileSync(path.join(__dirname, 'debug.log'), msg + '\n'); } catch (e) {}
}

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: false,
      contextIsolation: true
    }
  });

  writeLog('Creating BrowserWindow');
  win.loadFile('index.html').then(() => {
    writeLog('index.html loaded');
    try { win.webContents.openDevTools({ mode: 'right' }); writeLog('DevTools opened'); } catch (e) { writeLog('openDevTools failed: ' + e.message); }
  }).catch(err => writeLog('loadFile error: ' + err));
  win.on('ready-to-show', () => { writeLog('ready-to-show'); win.show(); });
}

app.whenReady().then(() => {
  createWindow();

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit();
});

// IPC handler to open a file dialog and return selected image paths
ipcMain.handle('select-images', async (event) => {
  const win = BrowserWindow.getFocusedWindow();
  const result = await dialog.showOpenDialog(win, {
    title: 'Select images',
    properties: ['openFile', 'multiSelections'],
    filters: [
      { name: 'Images', extensions: ['jpg', 'jpeg', 'png', 'gif', 'webp', 'bmp'] }
    ]
  });
  if (result.canceled) return [];
  return result.filePaths || [];
});
