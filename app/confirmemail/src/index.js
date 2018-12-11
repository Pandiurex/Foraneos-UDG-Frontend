import { confirmEmail } from '../../../js/models/auth.js';
import Cookie from '../../../js/cookie.js';
import { hideElements } from '../../../js/util/hideElements.js';
import goTo from '../../../js/util/goTo.js';

window.addEventListener('load', start);

let hash = window.location.search;
let email = '';

function start() {
  const type = Cookie.getCookie('type');
  if (type !== undefined) {
    goTo('/users/profile/');
  }

  hideElements(type);

  hash = hash.split('?h=');
  if (hash.length === 1) {
    goTo('/');
  }
  hash = hash[1];

  const divisor = hash.split('&e=');
  hash = divisor[0];
  if (divisor[1].length === 1){
    goTo('/')
  }
  email = divisor[1];
  confirm();
}

async function confirm() {
  const done = await confirmEmail({
    hash,
    email,
  });
  if (!done) {
    alert('Token expirado');
  }
}
