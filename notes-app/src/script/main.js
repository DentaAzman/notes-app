import notesData from "./data/notes-data.js";
import './components/index.js';

document.addEventListener('DOMContentLoaded', function () {
  const notesLists = document.getElementById('notesLists');

  function addNoteToLists(title, body) {
    const noteObject = {
      id: `notes-${Math.random().toString(36).substr(2, 9)}-${Math.random().toString(36).substr(2, 9)}`,
      title: title,
      body: body,
      createdAt: new Date().toISOString(),
      archived: false,
    };

    notesData.push(noteObject);

    
    const noteElement = document.createElement('div');
    noteElement.classList.add('notes');
    noteElement.innerHTML = `
      <h2>${title}</h2>
      <p>${body}</p>
    `;
    notesLists.appendChild(noteElement);
  }

  const formInput = document.querySelector('form-input');

  formInput.addEventListener('submit', function (event) {
    addNoteToLists(event.detail.title, event.detail.body);
  });

  notesData.forEach(function (notes) {
    addNoteToLists(notes.title, notes.body);
  });
});
