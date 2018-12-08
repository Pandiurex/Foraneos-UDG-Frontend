import User from '../../../js/models/user.js';
import Cookie from '../../../js/cookie.js';
import { hideElements } from '../../../js/util/hideElements.js';
import goTo from '../../../js/util/goTo.js';

window.addEventListener('load', start);

document.getElementById('btnedit').addEventListener('click', () => {
  goTo('/users/profile/edit/');
});

async function start() {
  const type = Cookie.getCookie('type');
  if (type === undefined) {
    goTo('/');
  }

  hideElements(type);

  const userId = Cookie.getCookie('user');
  const user = await User.get(userId);

  paintUser(user);
}

function paintUser({
  username, name, firstSurname, secondSurname,
  birthdate, gender, mainEmail, profileImage,
}) {
  const date = checkDate(birthdate);

  const usernameElement = document.getElementById('username');
  const nameElement = document.getElementById('name');
  const lastnameElement = document.getElementById('lastname');
  const emailElement = document.getElementById('infemail');
  const genderElement = document.getElementById('gender');
  const birthdateElement = document.getElementById('birthdate');

  usernameElement.value = username;
  nameElement.value = name;
  lastnameElement.value = `${firstSurname} ${secondSurname}`;
  emailElement.value = mainEmail;
  birthdateElement.value = date;

  if (gender === 0) {
    genderElement.value = 'Hombre';
  } else {
    genderElement.value = 'Mujer';
  }

  // const image = await User.getProfileImage(profileImage);
}

function checkDate(date) {
  const auxDate = date.split('-');

  let day = auxDate[2];
  let month = auxDate[1];
  const year = auxDate[0];


  if (day < 10) {
    day = `0${day}`;
  }
  if (month < 10) {
    month = `0${month}`;
  }

  return `${day}/${month}/${year}`;
}
