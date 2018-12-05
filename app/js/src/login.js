import regexs from '../util/regexs.js';

class Login {
  checkForm() {
    this.getElements();
    this.clearElements();
    this.checkRequired();
  }

  getElements() {
    this.elements = [];
    this.elements.email = document.getElementById('email');
    this.elements.password = document.getElementById('password');
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
        if (element.selectedIndex === 0 && element.required) {
          this.markElement(element);
          correct = false;
        }
        return;
      }
      if (element.required && element.value.length === 0) {
        this.markElement(element);
        correct = false;
      } else if (element.value.length !== 0) {
        if (!this.checkText(element)) {
          this.markElement(element);
          correct = false;
        }
      }
    });

    if (correct) {
      // enviar los VALORES al modelo
      console.log('Enviando al modelo');
      return true;
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

document.getElementById('btnsubmit').addEventListener('click', () => {
  const login = new Login();
  login.checkForm();
})

export default Login;
