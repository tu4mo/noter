import path from 'path'

import { app, Menu, MenuItem, Tray, BrowserWindow } from 'electron'

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
      preload: path.join(import.meta.dirname, 'preload.mjs'),
      scrollBounce: true
    },
    width: 300
  })

  noteWindow.loadFile(path.join(import.meta.dirname, 'index.html'))

  const contextMenu = new Menu()
  contextMenu.append(new MenuItem({ role: 'cut' }))
  contextMenu.append(new MenuItem({ role: 'copy' }))
  contextMenu.append(new MenuItem({ role: 'paste' }))
  contextMenu.append(new MenuItem({ type: 'separator' }))
  contextMenu.append(new MenuItem({ label: 'Quit', role: 'quit' }))

  noteWindow.webContents.on('context-menu', (e, params) => {
    contextMenu.popup({ window: noteWindow, x: params.x, y: params.y })
  })
}

app.dock.hide()

app.whenReady().then(() => {
  appIcon = new Tray(
    path.join(import.meta.dirname, '..', 'icon', 'iconTemplate.png')
  )
  appIcon.on('click', toggleNoteWindow)
})

// Prevent app from closing when all windows are closed
app.on('window-all-closed', () => {})
