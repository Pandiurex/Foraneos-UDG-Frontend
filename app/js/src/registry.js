import regexs from '../util/regexs.js';

window.onload = start;

class Registry {
  constructor() {
    this.form = document.getElementById('register-form');
  }

  checkForm() {
    this.getElements();
    this.clearElements();
    this.checkRequired();
  }

  getElements() {
    this.elements = [];
    this.elements.name = this.form.name;
    this.elements.lastname = this.form.lastname;
    this.elements.email = this.form.regemail;
    this.elements.password = this.form.regpassword;
    this.elements.confirmpassword = this.form.confirmpass;
  }

  clearElements() {
    Object.values(this.elements).forEach((element) => {
      element.style.borderColor = '#C7C7C7';
    });
  }

  checkRequired() {
    let correct = true;
    Object.values(this.elements).forEach((element) => {
      if (element.selectedIndex !== undefined) {
        if (element.selectedIndex === 0 && element.dataset.required) {
          this.markElement(element);
          correct = false;
        }
        return;
      }
      if (element.dataset.required && element.value.length === 0) {
        this.markElement(element);
        correct = false;
      } else if (element.value.length !== 0) {
        if (!this.checkText(element)) {
          this.markElement(element);
          correct = false;
        }
      }
    });
    
    if (this.form.regpassword.value !== this.form.confirmpass.value) {
      this.markElement(this.form.regpassword);
      this.markElement(this.form.confirmpass);
    }

    if (correct) {
      // enviar los VALORES al modelo
      console.log('Enviando al modelo');
    } else {
      console.log('Corregir los datos marcados');
    }
  }

  checkText(element) {
    return regexs[`${element.dataset.regexp}`].test(element.value);
  }

  markElement(element) {
    element.style.borderColor = 'red';
  }
}

function processRegisterForm() {
  const registry = new Registry();
  registry.checkForm();
}

function start() {
  document.getElementById('register-form')
    .addEventListener('submit', (e) => {
      e.preventDefault();
      processRegisterForm();
    }, false);
}
