import notesData from "./data/notes-data.js";
import './components/index.js';

document.addEventListener('DOMContentLoaded', function () {
  const formNote = document.getElementById('formNote');
  const notesLists = document.getElementById('notesLists');

  formNote.addEventListener('submit', function (event) {
    event.preventDefault();

    const title = formNote.elements.title.value;
    const body = formNote.elements.body.value;

    addNoteToLists(title, body);

    formNote.reset();
  });

  function addNoteToLists(title, body) {
    const noteElement = document.createElement('div');
    noteElement.classList.add('notes');
    noteElement.innerHTML = `
      <h2>${title}</h2>
      <p>${body}</p>
    `;
    notesLists.appendChild(noteElement);
  }

  notesData.forEach(function (notes) {
    addNoteToLists(notes.title, notes.body);
  });
});


const unfilledForm = document.querySelector('form');
const titleInput = unfilledForm.elements.title;
const bodyInput = unfilledForm.elements.body;

unfilledForm.addEventListener('submit', (event) => event.preventDefault());

const customValidationInputHandler = (event) => {
  event.target.setCustomValidity('');

  if (event.target.validity.valueMissing) {
    event.target.setCustomValidity('Harus diisi.');
    return;
  }
};

titleInput.addEventListener('change', customValidationInputHandler);
titleInput.addEventListener('invalid', customValidationInputHandler);

bodyInput.addEventListener('input', customValidationInputHandler);
bodyInput.addEventListener('invalid', customValidationInputHandler);

titleInput.addEventListener('blur', (event) => {
  updateValidationMessage(event.target);
});

bodyInput.addEventListener('blur', (event) => {
  updateValidationMessage(event.target);
});

function updateValidationMessage(input) {
  const isValid = input.validity.valid;
  const errorMessage = input.validationMessage;
  
  const connectedValidationId = input.getAttribute('aria-describedby');
  const connectedValidationEl = connectedValidationId ?
    document.getElementById(connectedValidationId) : null;

  if (connectedValidationEl && errorMessage && !isValid) {
    connectedValidationEl.innerText = errorMessage;
  } else {
    connectedValidationEl.innerText = '';
  }
}