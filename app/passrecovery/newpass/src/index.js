import { passRecovery } from '../../../js/models/auth.js';
import Cookie from '../../../js/cookie.js';
import { checkRequired, markElement } from '../../../js/util/validator.js';
import { getKeyValues, clearUndefined } from '../../../js/util/list.js';
import { hideElements } from '../../../js/util/hideElements.js';

window.addEventListener('load', start);

let hash = window.location.search;

function start() {
  const type = Cookie.getCookie('type');
  if (type !== undefined) {
    window.location.pathname = '/users/profile/';
  }

  hideElements(type);

  hash = hash.split('?h=');
  if (hash.length === 1) {
    window.location.pathname = '/';
  }
  hash = hash[1];
}

document.getElementById('btnreplace').addEventListener('click', () => {
  checkForm();
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
  elements.password = document.getElementById('recover-password');
  elements.password2 = document.getElementById('confirm-password');
  return elements;
}
