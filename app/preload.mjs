import debounce from 'lodash.debounce'

window.addEventListener('DOMContentLoaded', () => {
  const editor = document.getElementById('editor')

  editor.focus()

  editor.innerText = localStorage.getItem('note') ?? ''

  const saveNote = () => {
    localStorage.setItem('note', editor.innerText)
  }

  editor.addEventListener('input', debounce(saveNote, 1000))
})
