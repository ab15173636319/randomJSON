const { app, BrowserWindow, ipcMain } = require('electron')

const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    icon: './dist/logo.png',
    title: "Luizhen's Blog",
    autoHideMenuBar: true,
    webPreferences: {
      nodeIntegration: true,
      loadFile: './preload.js',
    },
  })
  win.loadFile('./index.html')
}

app.whenReady().then(() => {
  createWindow()
})
