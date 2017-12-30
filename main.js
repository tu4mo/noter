const electron = require('electron')
const path = require('path')
const url = require('url')

const { app, Menu, Tray } = electron
const BrowserWindow = electron.BrowserWindow

const noteWindows = []

app.dock.hide()

// Prevent app from closing when all windows are closed
app.on('window-all-closed', () => {})

const createTray = () => {
  const appIcon = new Tray('icon/iconTemplate.png')

  const contextMenu = Menu.buildFromTemplate([
    { label: 'Item1', type: 'radio' },
    { label: 'Item2', type: 'radio' }
  ])

  // Make a change to the context menu
  contextMenu.items[1].checked = false

  // Disabled for now
  // appIcon.setContextMenu(contextMenu)

  appIcon.on('click', createNoteWindow)
}

const createNoteWindow = () => {
  const noteWindow = new BrowserWindow({
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

  noteWindow.on('closed', () => {
    destroyNoteWindow(noteWindow)
  })

  noteWindows.push(noteWindow)
}

const destroyNoteWindow = noteWindow => {
  const i = noteWindows.indexOf(noteWindow)
  if (i > -1) noteWindows.splice(i, 1)
  noteWindow = null
}

app.on('ready', createTray)
