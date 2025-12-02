import { app, BrowserWindow, Tray, Menu, screen, ipcMain, nativeTheme } from 'electron';
import path from 'path';
import { fileURLToPath } from 'url';
import screenshot from 'screenshot-desktop';
import sharp from 'sharp';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

let mainWindow: BrowserWindow | null = null;
let tray: Tray | null = null;

function createWindow() {
  const { width, height } = screen.getPrimaryDisplay().workAreaSize;
  mainWindow = new BrowserWindow({
    width, height,
    transparent: true,
    frame: false,
    skipTaskbar: true,
    hasShadow: false,
    resizable: false,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
    },
  });

  mainWindow.setIgnoreMouseEvents(true, { forward: true });
  if (process.env.VITE_DEV_SERVER_URL) {
    mainWindow.loadURL(process.env.VITE_DEV_SERVER_URL);
  } else {
    mainWindow.loadFile(path.join(__dirname, '../index.html'));
  }
}

app.whenReady().then(() => {
  createWindow();

  tray = new Tray(path.join(__dirname, '../public/icon.png'));
  const menu = Menu.buildFromTemplate([
    { label: 'Toggle Haunt', click: () => mainWindow?.webContents.send('toggle-haunt') },
    { label: 'Pause', click: () => mainWindow?.webContents.send('pause-haunt') },
    { label: 'Quit', click: () => app.quit() },
  ]);
  tray.setToolTip('Resonance Haunt');
  tray.setContextMenu(menu);
});

ipcMain.handle('get-theme', () => nativeTheme.shouldUseDarkColors);

ipcMain.handle('sample-screen', async () => {
  const displays = await screenshot.all();
  const primary = displays[0];
  const { data, info } = await sharp(primary).resize(16, 9).raw().toBuffer({ resolveWithObject: true });
  const grid: number[][] = [];
  for (let y = 0; y < 9; y++) {
    const row: number[] = [];
    for (let x = 0; x < 16; x++) {
      const i = (y * 16 + x) * 3;
      row.push((data[i] + data[i + 1] + data[i + 2]) / 3 / 255);
    }
    grid.push(row);
  }
  return { grid, width: info.width, height: info.height };
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});
