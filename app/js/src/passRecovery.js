import Cookie from '../cookie.js';
import regexs from '../util/regexs.js';
const token = window.location.search;

class passRecovery {
  checkForm() {
    Cookie.clearCookies();
    this.getElements();
    this.clearElements();
    const values = this.getValues();
    if(values.password1 == values.password2){
      this.postrecoveryPassword();
    }else {
      alert("Las contraseñas no coinciden");
    }
    //this.checkRequired();

  }

  getElements() {
    this.elements = [];
    this.elements.password1 = document.getElementById('recover-password');
    this.elements.password2 = document.getElementById('confirm-password');
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
      console.log(values);
      //const done = await Cookie.login(values);
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

  postrecoveryPassword() {
    const values = this.getValues();
    const hash = token.split("?h=");
    const pass =values.password2;
    fetch('https://api.foraneos-udg.ml/api/auth/passwordRecovery',{
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: `hash=${hash[1]}&password=${pass}`
    })
    .then(response => response.json())
    .then(data => {
      if(data.status==200){
        console.log(data);
      }
    })
    .catch((err) => {
      console.error(err);
    });
  }

}

document.getElementById('btnreplace').addEventListener('click', () => {
  const recovery = new passRecovery();
  recovery.checkForm();
});

export default passRecovery;
