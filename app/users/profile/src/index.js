import User from '../../../js/models/user.js';
import Cookie from '../../../js/cookie.js';
import { checkRequired, markElement } from '../../../js/util/validator.js';
import { getKeyValues, clearUndefined } from '../../../js/util/list.js';
import { hideElements } from '../../../js/util/hideElements.js';

window.addEventListener('load', start);

async function start() {
  const type = Cookie.getCookie('type');
  if (type === undefined) {
    window.location.pathname = '/';
  }

  hideElements(type);

  const userId = Cookie.getCookie('user');
  const user = await User.get(userId);

  paintUser(user);
}

function paintUser({
  username, name, firstSurname, secondSurname,
  birthdate, gender, emails,
}) {
  const { email } = emails[0];

  const usernameElement = document.getElementById('username');
  const nameElement = document.getElementById('name');
  const lastnameElement = document.getElementById('lastname');
  const emailElement = document.getElementById('infemail');
  const birthdateElement = document.getElementById('birthdate');

  usernameElement.value = username;
  nameElement.value = name;
  lastnameElement.value = `${firstSurname} ${secondSurname}`;
  emailElement.value = email;
  birthdateElement.value = birthdate;
}
