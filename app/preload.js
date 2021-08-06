const Store = require('electron-store')
const debounce = require('lodash.debounce')

const store = new Store()

window.addEventListener('DOMContentLoaded', () => {
  const editor = document.getElementById('editor')

  editor.focus()

  const note = store.get('note', '')
  editor.innerText = note

  const saveNote = () => {
    store.set('note', editor.innerText)
  }

  editor.addEventListener('input', debounce(saveNote, 1000))
})
