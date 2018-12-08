import Msg from '../../../js/models/msg.js';
import Cookie from '../../../js/cookie.js';
import {
  hideElements,
} from '../../../js/util/hideElements.js';
import goTo from '../../../js/util/goTo.js';

window.addEventListener('load', start);

document.getElementById('btnsend').addEventListener('click', () => {
  goTo('/users/profile/locations/tenant/');
});

async function start() {
  const type = Cookie.getCookie('type');
  if (type === undefined) {
    goTo('/');
  }

  hideElements(type);

  const msgid = Cookie.getCookie('msg');
  const msg = await Msg.get(msgId);

  paintMsg(msg);
}
function paintMsg({
  senderUserId,
  locationId,
  messege,
}) {
  const date = checkDate(birthdate);

  const msgRecieve = document.getElementById('msg-recieve');
  const msgSend = document.getElementById('msg-send');

  msgRecieve.value = messege;
  msgSend.value = messege;

  if (gender === 0) {
    genderElement.value = 'Hombre';
  } else {
    genderElement.value = 'Mujer';
  }

  // const image = await User.getProfileImage(profileImage);
}

function scrollDown() {
  const objDiv = document.getElementById('chat');
  objDiv.scrollTop = objDiv.scrollHeight;
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
