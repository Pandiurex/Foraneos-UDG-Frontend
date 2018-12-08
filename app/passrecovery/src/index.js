import { reqPassRecovery } from '../../js/models/auth.js';
import Cookie from '../../js/cookie.js';
import { checkRequired, markElement } from '../../js/util/validator.js';
import { getKeyValues, clearUndefined } from '../../js/util/list.js';
import { hideElements } from '../../js/util/hideElements.js';

window.addEventListener('load', start);

function start() {
  const type = Cookie.getCookie('type');
  if (type !== undefined) {
    window.location.pathname = '/users/profile/';
  }

  hideElements(type);
}

document.getElementById('btnrecover').addEventListener('click', () => {
  checkForm();
});

async function checkForm() {
  const elements = getElements();
  const correct = checkRequired(elements);

  if (correct) {
    let values = getKeyValues(elements);
    values = clearUndefined(values);
    const done = await reqPassRecovery(values);
    if (!done) {
      markElement(elements.email);
      console.log('Corregir los datos marcados');
    }
  } else {
    console.log('Corregir los datos marcados');
  }
}

function getElements() {
  const elements = [];
  elements.email = document.getElementById('recoveremail');
  return elements;
}
