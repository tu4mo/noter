const electron = require('electron')
const path = require('path')
const url = require('url')

const { app, Menu, Tray } = electron
const BrowserWindow = electron.BrowserWindow

let appIcon = null
let noteWindow = null

const toggleNoteWindow = () => {
  if (noteWindow) {
    if (noteWindow.isVisible()) {
      noteWindow.hide()
      appIcon.setHighlightMode('never')
    } else {
      noteWindow.show()
      appIcon.setHighlightMode('always')
    }
  } else {
    noteWindow = new BrowserWindow({
      alwaysOnTop: true,
      backgroundColor: '#ffffff',
      height: 300,
      minimizable: false,
      minWidth: 200,
      frame: false,
      maximizable: false,
      width: 300
    })

    noteWindow.loadURL(
      url.format({
        pathname: path.join(__dirname, 'index.html'),
        protocol: 'file:',
        slashes: true
      })
    )

    appIcon.setHighlightMode('always')
  }
}

app.dock.hide()

app.on('ready', () => {
  appIcon = new Tray('icon/iconTemplate.png')
  appIcon.on('click', toggleNoteWindow)
})

// Prevent app from closing when all windows are closed
app.on('window-all-closed', () => {})
