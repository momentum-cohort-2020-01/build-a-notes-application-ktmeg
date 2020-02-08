/* globals fetch, moment */

function print (value) {
  console.log(value)
  return value
}

function q (selector) {
  return document.querySelector(selector)
}

function getAllNotes () {
  return fetch('http://localhost:3000/notes/', {
    method: 'GET'
  })
    .then(response => response.json())
}
console.log('get all notes working')

function createNotesHTML (notes) {
  return `<ul id="notes-list">${notes.map(note => `<li${note.note}</li>`).join('')}</ul>`
}
console.log('create Notes HTML function working')

function createNoteHTML (note) {
  return `<li data-note-id=${note.note}<button class="delete"><img src="https://www.pngkit.com/png/detail/254-2544941_manage-the-delete-button-of-the-receiving-address.png"></button></li>`
}
// can't get pic to show up??//
console.log('button working')

function postNewNote (noteText) {
  return fetch('http://localhost:3000/notes/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ note: noteText, done: false, created: moment().format('MMMM Do YYYY, h:mm:ss a') })
  })
    .then(response => response.json())
}
console.log('stringify function working')

function renderNotesList (notes) {
  const notesHTML = createNotesHTML(notes)
  const notesSection = document.querySelector('#notes')
  notesSection.innerHTMl = notesHTML
}
console.log('render notes list working')

function renderNewNote (note) {
  const noteHTML = createNoteHTML
  const notesList = document.querySelector('#notes-list')
  notesList.insertAdjacentHTML('beforeend', noteHTML)
}
console.log('render new note is working')

getAllNotes().then(renderNotesList)

console.log('get all notes')

q('#new-notes-form').addEventListener('submit', event => {
    // need to add 'event'?//
  event.preventDefault()
  const noteTextField = q('#note-text')
  const noteText = noteTextField.value
  noteTextField.value = ''
  postNewNote(noteText.then(renderNewNote))
})

console.log('add event listener working')

q('#notes').addEventListener('click', event => {
    //need to add 'event'?//
  if (event.target.matches('.delete')) {
    print('delete' + event.target.parentElement.dataset.noteID)
  }
  console.log('event target delete working')

  // TODO send AJAX request to delete todo
  // TODO remove li with dataset-todo-id equal to id from the DOM
})
