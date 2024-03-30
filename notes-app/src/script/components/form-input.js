class FormInput extends HTMLElement {
  _shadowRoot = null;
  _style = null;
  _titleValidation = null;
  _bodyValidation = null;

  constructor() {
    super();

    this._shadowRoot = this.attachShadow({ mode: 'open' });
    this._style = document.createElement('style');
    this._shadowRoot.appendChild(this._style);
    this.render();
  }

  connectedCallback() {
    const unfilledForm = this._shadowRoot.querySelector('form');
    const titleInput = unfilledForm.elements.title;
    const bodyInput = unfilledForm.elements.body;

    const customValidationInputHandler = (event) => {
      event.target.setCustomValidity('');
    
      if (event.target.validity.valueMissing) {
        event.target.setCustomValidity('Harus diisi.');
        return;
      }
    };
    
    titleInput.addEventListener('input', customValidationInputHandler);
    titleInput.addEventListener('invalid', customValidationInputHandler);

    bodyInput.addEventListener('input', customValidationInputHandler);
    bodyInput.addEventListener('invalid', customValidationInputHandler);

    titleInput.addEventListener('blur', () => this.updateValidationMessage(titleInput, this._titleValidation));
    bodyInput.addEventListener('blur', () => this.updateValidationMessage(bodyInput, this._bodyValidation));

    unfilledForm.addEventListener('submit', (event) => {
      event.preventDefault();

      const title = titleInput.value;
      const body = bodyInput.value;

      this.dispatchEvent(new CustomEvent('submit', { detail: {title, body} }));

      unfilledForm.reset();
    });
  }

  updateValidationMessage(input, validationMessageElement) {
    const isValid = input.validity.valid;
    const errorMessage = input.validationMessage;
  
    if (errorMessage && !isValid) {
      validationMessageElement.innerText = errorMessage;
    } else {
      validationMessageElement.innerText = '';
    }
  }

  _updateStyle() {
    this._style.textContent = `
      :host {
        display: block;
      }

      h2 {
        text-align: center;
      }
      
      label {
        display: inline-block;
        margin-block-end: 0.5rem;
      }
      
      input,
      textarea {
        display: block;
      
        padding: 0.5rem 0.3rem;
        border: 1px solid black;
        border-radius: 10px;
      
        width: 100%;
      }
      
      textarea {
        resize: vertical;
      }
      
      button {
        appearance: none;
        -webkit-appearance: none;
      
        margin: 0;
        padding: 0;
        border: none;
      
        display: inline-block;
        background: transparent;
      
        line-height: 1;
      
        cursor: pointer;
      }
      
      label,
      input,
      button {
        font-size: 1.1rem;
      
        transition: all 150ms linear;
      }
      
      .form-group {
        margin-block-end: 1rem;
      }
      
      input:focus-visible,
      textarea:focus-visible {
        appearance: none;
        outline: none;
      
        box-shadow: 0 0 0 6px rgb(30, 144, 255, 0.65);
      }
      
      .btn-container {
        display: flex;
        justify-content: center;
      }
      
      .btn {
        background-color: rgb(0, 141, 218);
      
        border-radius: 0.3rem;
        padding: 0.8rem 3rem;
      
        color: beige;
      }
      
      .btn:hover {
        background-color: rgb(0, 157, 241);
      }
      
      .btn:active {
        background-color: rgb(65, 201, 226);
      }
      
      .validation-message {
        margin-block-start: 0.5rem;
        color: red;
      }
    `;
  }

  render() {
    this._updateStyle();

    this._shadowRoot.innerHTML += `
      <form id="formNote">
        <h2>Tambahkan Catatan Baru</h2>

        <div class="form-group">
          <label for="title">Judul</label>
          <input 
            type="text" 
            name="title" 
            id="title" 
            required 
            aria-describedby="titleValidation">
          <p id="titleValidation" class="validation-message" aria-live="polite"></p>
        </div>

        <div class="form-group">
          <label for="body">Isi</label>
          <textarea 
            name="body" 
            id="body" 
            rows="3" 
            required 
            aria-describedby="bodyValidation"></textarea>
          <p id="bodyValidation" class="validation-message" aria-live="polite"></p>
        </div>

        <div class="form-group btn-container">
          <button class="btn">Tambah Catatan</button>
        </div>
      </form>
    `;

    this._titleValidation = this._shadowRoot.getElementById('titleValidation');
    this._bodyValidation = this._shadowRoot.getElementById('bodyValidation');
  }
}

customElements.define('form-input', FormInput);
