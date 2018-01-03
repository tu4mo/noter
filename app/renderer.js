const Store = require('electron-store')
const store = new Store()

const editor = document.getElementById('editor')

editor.focus()

const note = store.get('note') || ''
editor.innerText = note

editor.addEventListener('input', () => {
  store.set('note', editor.innerText)
})
