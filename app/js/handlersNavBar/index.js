import { login, logout } from '../models/auth.js';
import Cookie from '../cookie.js';
import regexs from '../util/regexs.js';
import { checkRequired } from '../util/validator.js'
import { getKeyValues, clearUndefined } from '../util/list.js';
import { markElement } from '../util/validator.js';

if (document.getElementById('btn-login')) {
  document.getElementById('btn-login').addEventListener('click', () => {
    checkForm();
  });
}

if (document.getElementById('menu-logout')) {
  document.getElementById('menu-logout').addEventListener('click', () => {
    logout();
  });
}

async function checkForm() {
  const elements = getElements();
  const correct = checkRequired(elements);

  if (correct) {
    const values = getKeyValues(elements);
    const done = await login(values);
    console.log(done);
    if (!done) {
      Object.values(elements).forEach((element) => {
        markElement(element);
      });
      console.log('Correo o contrasena incorrectos');
    }
  } else {
    console.log('Corregir los datos marcados');
  }
}

function getElements() {
  const elements = [];
  elements.email = document.getElementById('login-email');
  elements.password = document.getElementById('login-password');
  return elements;
}
