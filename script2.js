/* globals fetch, moment */

// Helper funfctions
function q (selector) {
  return document.querySelector(selector)
}

// AJAX functions
function getNotes () {
  return fetch('http://localhost:3000/notes/', {
    method: 'GET'
  }).then(response => response.json())
}

function postNewNote (note) {
  return fetch('http://localhost:3000/notes/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      title: note.title,
      body: note.body,
      created: moment().format('MMMM Do YYYY, h:mm:ss a')
    })
  }).then(response => response.json())
}

// function deleteNote (note) {
//   return fetch('http://localhost:3000/notes/' + `${note.id}`, {
//     method: 'DELETE',
//     headers: { 'Content-Type': 'application/json' }
//   }).then(response => q(`${note.id}`).remove())
// }

// **WORK ON THIS**
function deleteNote (note) {
  return fetch(`http://localhost:3000/notes/${note.id}`, {
    method: 'DELETE'
  })
}
// Build/Render notes
// making an UL for the notes //
function createNotesHTML (notes) {
  // looping through the notes list //
  return `
    <ul id="notes-list">
      ${notes.map((note) => `
        <li id='${note.id}'>
          <h4>${note.title}<h4>
          <p>${note.created}</p>
          <p>${note.body}</p>
        </li>
        <button id="delete-note">delete</button>
      `).join('')}
    </ul>
  `
}

// rendering the notes UL to the DOM //
function renderNotes (notes) {
  // calling createNotes function
  const notesHTML = createNotesHTML(notes)
  const notesSection = document.getElementById('notes')
  notesSection.innerHTML = notesHTML
}

function createNewNoteHTML (note) {
  return `
    <li id='${note.id}'>
      <h4>${note.title}<h4>
      <p>${note.created}</p>
      <p>${note.body}</p>
    </li>
  `
}

function renderNewNote (note) {
  const noteHTML = createNewNoteHTML(note)
  const noteList = document.getElementById('notes-list')
  noteList.insertAdjacentHTML('beforeend', noteHTML)
}

getNotes().then(renderNotes)

// Event Listeners
q('#notes-form').addEventListener('submit', event => {
  event.preventDefault()
  const notesTitleInput = q('#notes-title')
  const notesBodyInput = q('#notes-body')
  const newNote = {
    title: notesTitleInput.value,
    body: notesBodyInput.value
  }
  notesTitleInput.value = ''
  notesBodyInput.value = ''
  postNewNote(newNote).then(renderNewNote)
})

//**WORK ON THIS */
q('#notes').addEventListener('click', (event, note) => {
  if (event.target.matches('#delete-note')) {
    deleteNote(event.target.parentElement.parentElement.dataset.note)
    // const noteEl = q(`${note.id}`)
    // deleteNote(noteEl).then(renderNotes)
    // TODO send AJAX request to delete todo -- can't get 
    // TODO remove li with dataset-todo-id equal to id from the DOM
  }
})
