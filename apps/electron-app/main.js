const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const Database = require('better-sqlite3');

const db = new Database('erp.db');
db.prepare('CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY, name TEXT)').run();

ipcMain.handle('get-users', () => {
  return db.prepare('SELECT * FROM users').all();
});

ipcMain.handle('add-user', (event, name) => {
  return db.prepare('INSERT INTO users (name) VALUES (?)').run(name);
});

function createWindow() {
  const win = new BrowserWindow({
    width: 1000,
    height: 700,
    webPreferences: {
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js'),
    },
  });

const startUrl =
    process.env.ELECTRON_START_URL ||
    `file://${path.join(__dirname, '../web-build/index.html')}`;

  win.loadURL(startUrl);
}

app.whenReady().then(createWindow);
