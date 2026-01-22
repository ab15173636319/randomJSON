const { app, BrowserWindow } = require('electron')

const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    icon: 'https://luizhen.xyz/logo.svg',
    webPreferences: {
      nodeIntegration: true,
    },
  })
  win.loadFile('./dist/index.html')
}

app.whenReady().then(() => {
  createWindow()
})
