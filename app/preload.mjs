import Store from 'electron-store'
import debounce from 'lodash.debounce'

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
