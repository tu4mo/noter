const remote = require('electron').remote

const editor = document.getElementById('editor')
const closeButton = document.getElementById('closeButton')

closeButton.addEventListener('click', () => {
  const window = remote.getCurrentWindow()
  window.close()
})

editor.focus()
