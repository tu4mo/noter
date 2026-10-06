function debounce(fn, wait) {
  let timeout
  return (...args) => {
    clearTimeout(timeout)
    timeout = setTimeout(() => fn(...args), wait)
  }
}

window.addEventListener('DOMContentLoaded', () => {
  const editor = document.getElementById('editor')

  editor.focus()

  editor.innerText = localStorage.getItem('note') ?? ''

  const saveNote = () => {
    localStorage.setItem('note', editor.innerText)
  }

  editor.addEventListener('input', debounce(saveNote, 500))
})
