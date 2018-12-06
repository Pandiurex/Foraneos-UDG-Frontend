import Cookie from '../cookie.js';
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

  async checkRequired() {
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

    const values = this.getValues();

    if (correct) {
      const done = await Cookie.login(values);
      if (!done) {
        Object.values(this.elements).forEach((element) => {
          this.markElement(element);
        });
        console.log('Correo o contrasena incorrectos');
      }
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

  getValues() {
    const values = [];

    Object.keys(this.elements).forEach((key) => {
      if (this.elements.hasOwnProperty(key)) {
        if (this.elements[key].selectedIndex !== undefined) {
          values[key] = this.elements[key].selectedIndex;
          return;
        }
        values[key] = this.elements[key].value;
      }
    });

    return values;
  }
}

document.getElementById('btnsubmit').addEventListener('click', () => {
  const login = new Login();
  login.checkForm();
});

export default Login;
