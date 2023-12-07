import electron from 'electron'
import path from 'path'
import Store from 'electron-store'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

Store.initRenderer()

const { app, Menu, MenuItem, Tray } = electron
const BrowserWindow = electron.BrowserWindow

let appIcon = null
let noteWindow = null

const toggleNoteWindow = () => {
  if (noteWindow) {
    if (noteWindow.isVisible()) {
      noteWindow.hide()
    } else {
      noteWindow.show()
    }
  } else {
    createNoteWindow()
  }
}

const createNoteWindow = () => {
  noteWindow = new BrowserWindow({
    alwaysOnTop: true,
    backgroundColor: '#eee',
    frame: false,
    height: 300,
    minimizable: false,
    minWidth: 200,
    maximizable: false,
    webPreferences: {
      nodeIntegration: true,
      preload: path.join(__dirname, 'preload.mjs'),
      scrollBounce: true
    },
    width: 300
  })

  noteWindow.loadFile(path.join(__dirname, 'index.html'))

  const contextMenu = new Menu()
  contextMenu.append(new MenuItem({ role: 'cut' }))
  contextMenu.append(new MenuItem({ role: 'copy' }))
  contextMenu.append(new MenuItem({ role: 'paste' }))
  contextMenu.append(new MenuItem({ type: 'separator' }))
  contextMenu.append(new MenuItem({ label: 'Quit', role: 'quit' }))

  noteWindow.webContents.on('context-menu', (e, params) => {
    contextMenu.popup(noteWindow, params.x, params.y)
  })
}

app.dock.hide()

app.whenReady().then(() => {
  appIcon = new Tray(path.join(__dirname, '..', 'icon', 'iconTemplate.png'))
  appIcon.on('click', toggleNoteWindow)
})

// Prevent app from closing when all windows are closed
app.on('window-all-closed', () => {})
