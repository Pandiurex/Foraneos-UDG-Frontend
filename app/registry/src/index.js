import User from '../../js/models/user.js';
import Cookie from '../../js/cookie.js';
import { checkRequired, markElement } from '../../js/util/validator.js';
import { getKeyValues, clearUndefined } from '../../js/util/list.js';
import { hideElements } from '../../js/util/hideElements.js';

window.addEventListener('load', start);

let image = '';
let userType = '';
let gender = '';

function start() {
  const type = Cookie.getCookie('type');
  if (type !== undefined) {
    window.location.pathname = '/users/profile/';
  }

  hideElements(type);

  userType = 2;
  gender = 0;
}

document.getElementById('btnregister').addEventListener('click', () => {
  checkForm();
});

document.getElementById('man').addEventListener('click', () => {
  gender = 0;
});

document.getElementById('woman').addEventListener('click', () => {
  gender = 1;
});

document.getElementById('tenant').addEventListener('click', () => {
  userType = 2;
});

document.getElementById('owner').addEventListener('click', () => {
  userType = 1;
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
    if (!correctBirthdate(values.birthdate)) {
      markElement(elements.birthdate);
      alert('Formato o fecha incorrecta en la fecha de nacimiento');
      return;
    }
    if (values.password === values.password2) {
      values.image = image;
      values.userType = userType;
      values.gender = gender;
      console.log(values);
      const done = await User.post(values);
      if (!done) {
        console.log('Error');
      }
    } else {
      markElement(elements.password);
      markElement(elements.password2);
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
  elements.birthdate = document.getElementById('birthdate');
  elements.mainEmail = document.getElementById('regemail');
  elements.password = document.getElementById('regpassword');
  elements.password2 = document.getElementById('confirmpass');
  return elements;
}

function correctBirthdate(date) {
  if (date === undefined) {
    return false;
  }

  const arr = date.split('-');
  const auxDate = new Date(arr[0], arr[1] - 1, arr[2]);

  if (arr.length === 3 && auxDate
   && Number(arr[0]) === auxDate.getFullYear()
   && Number(arr[1] - 1) === auxDate.getMonth()
   && Number(arr[2]) === auxDate.getDate()) {
    return true;
  }
  return false;
}
