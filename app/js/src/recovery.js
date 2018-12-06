import Cookie from '../cookie.js';
import regexs from '../util/regexs.js';

class Recovery {
  checkForm() {
    Cookie.clearCookies();
    this.getElements();
    this.clearElements();
    //this.checkRequired();
    this.postRecovery();
  }

  getElements() {
    this.elements = [];
    this.elements.email = document.getElementById('recoveremail');
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

  postRecovery() {
    const values = this.getValues();
    console.log(values.email);
    fetch(`https://api.foraneos-udg.ml/api/auth/reqPasswordRecovery?email=${values.email}`,{
      method: 'GET',
    })
    .then(response => response.json())
    .then(data => {
      //console.log('data=',data);
      if(data.status==200){
        console.log(data);
      }
    })
    .catch((err) => {
      console.error(err);
    });
  }

}

document.getElementById('btnrecover').addEventListener('click', () => {
  const recovery = new Recovery();
  recovery.checkForm();
});

export default Recovery;
