import User from '../../js/models/user.js';
import Cookie from '../../js/cookie.js';
import { checkRequired, markElement } from '../../js/util/validator.js';
import { getKeyValues, clearUndefined } from '../../js/util/list.js';
import { hideElements } from '../../js/util/hideElements.js';

window.addEventListener('load', start);

let image = '';

function start() {
  const type = Cookie.getCookie('type');
  if (type !== undefined) {
    window.location.pathname = '/users/profile/';
  }

  hideElements(type);
}

document.getElementById('btnregister').addEventListener('click', () => {
  checkForm();
});

document.getElementById('image-file').addEventListener('change', (event) => {
  const output = document.getElementById('profile-image');
  image = event.target.files[0];
  output.src = URL.createObjectURL(image);
});

async function checkForm() {
  const elements = getElements();
  const correct = checkRequired(elements);

  if (correct) {
    let values = getKeyValues(elements);
    values = clearUndefined(values);
    if (values.password === values.password2) {
      const done = await passRecovery({
        hash,
        password: values.password,
      });
      if (!done) {
        console.log('Token expirado');
      }
    } else {
      alert('Las contraseñas no coinciden');
    }
  } else {
    console.log('Corregir los datos marcados');
  }
}

function getElements() {
  const elements = [];
  elements.username = document.getElementById('username');
  elements.name = document.getElementById('name');
  elements.firstSurname = document.getElementById('firstsurname');
  elements.secondSurname = document.getElementById('secondsurname');
  elements.mainEmail = document.getElementById('regemail');
  elements.password = document.getElementById('regpassword');
  elements.password2 = document.getElementById('confirmpass');
  return elements;
}





// import regexs from '../../js/util/regexs.js';
// import Cookie from '../../js/cookie.js';
// import { hideElements } from '../../js/util/hideElements.js';

// window.addEventListener('load', start);

// function start() {
//   const type = Cookie.getCookie('type');
//   hideElements(type);

//   if (type === '1') {
//     window.location.replace("./index.html");
//   }
// }

// class Registry {
//   checkForm() {
//     this.getElements();
//     this.clearElements();
//     this.checkRequired();
//   }

//   getElements() {
//     this.elements = [];
//     this.elements.name = document.getElementById('name');
//     this.elements.firstSurname = document.getElementById('firstsurname');
//     this.elements.secondSurname = document.getElementById('secondsurname');
//     this.elements.email = document.getElementById('regemail');
//     this.elements.password = document.getElementById('regpassword');
//     this.elements.confirmPassword = document.getElementById('confirmpass');
//     console.log(this.elements);
//   }

//   clearElements() {
//     Object.values(this.elements).forEach((element) => {
//       element.style.borderColor = '#C7C7C7';
//     });
//   }

//   checkRequired() {
//     let correct = true;
//     Object.values(this.elements).forEach((element) => {
//       if (element.selectedIndex !== undefined) {
//         if (element.selectedIndex === 0 && element.required) {
//           this.markElement(element);
//           correct = false;
//         }
//         return;
//       }
//       if (element.required && element.value.length === 0) {
//         this.markElement(element);
//         correct = false;
//       } else if (element.value.length !== 0) {
//         if (!this.checkText(element)) {
//           this.markElement(element);
//           correct = false;
//         }
//       }
//     });

//     if (document.getElementById('regpassword').value !== document.getElementById('confirmpass').value) {
//       this.markElement(document.getElementById('regpassword'));
//       this.markElement(document.getElementById('confirmpass'));
//       correct = false;
//     }

//     if (correct) {
//       // enviar los VALORES al modelo
//       document.getElementById('register-form').style.visibility = 'hidden';
//       document.getElementById('confirmation').style.visibility = 'visible';

//       console.log('Enviando al modelo');
//     } else {
//       console.log('Corregir los datos marcados');
//     }
//   }

//   checkText(element) {
//     return regexs[`${element.dataset.regexp}`].test(element.value);
//   }

//   markElement(element) {
//     element.style.borderColor = 'red';
//   }
// }

// document.getElementById('btnregister').addEventListener('click', () => {
//   const registry = new Registry();
//   registry.checkForm();
// });
