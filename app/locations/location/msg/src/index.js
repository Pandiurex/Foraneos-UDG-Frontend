import Cookie from '../../../../js/cookie.js';
import { hideElements } from '../../../../js/util/hideElements.js';
import Location from '../../../../js/models/location.js';
import Message from '../../../../js/models/message.js';

window.addEventListener('load', start);

let locationId = '';

async function start() {
  const type = Cookie.getCookie('type');
  hideElements(type);

  locationId = getParameter('l');
  if (locationId === undefined) {
    goTo('/locations/');
  }

  const location = await Location.get(locationId);
  paintLocation(location);

  const messages = await Message.getAll(locationId);
  paintMessages(messages);
  console.log(messages);
}

function getParameter(paramName) {
  const searchString = window.location.search.substring(1);
  const params = searchString.split('&');

  for (let i = 0; i < params.length; i += 1) {
    const val = params[i].split('=');
    if (val[0] === paramName) {
      return val[1];
    }
  }
  return undefined;
}

document.getElementById('btn-send').addEventListener('click', async() => {
  const message = document.getElementById('message');
  if (message.value !== '') {
    await Message.post(locationId, message.value);
    const time = getActualTime();
    paintRightMessage({
      message: message.value,
      time,
    });
    message.value = '';
  }
});

function getActualTime() {
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hour = date.getHours();
  const minute = date.getMinutes();
  const second = date.getSeconds();

  let time = [year, month, day].join('-');
  time += ' ';
  time += [hour, minute, second].join(':');

  return time;
}

function paintLocation(location) {
  const locationImage = document.getElementById('location-image');
  locationImage.src = URL.createObjectURL(location.images[0]);
  const address = document.getElementById('address');
  address.value = `${location.street} Int. ${location.intNum}, Col. ${location.colony}`;
  const cost = document.getElementById('cost');
  cost.value = `$${location.cost}`;
}

function paintMessages(messages) {
  const userId = Cookie.getCookie('user');
  messages.forEach((message) => {
    if (message.senderUserId === Number(userId)) {
      paintRightMessage(message);
    } else {
      paintLeftMessage(message);
    }
  });
}

function paintLeftMessage(message) {
  const chat = document.getElementById('chat');
  const divContainer = document.createElement('div');
  divContainer.className = 'container darker left';
  const pMessage = document.createElement('p');
  const messageText = document.createTextNode(`${message.message}`);
  const spanTime = document.createElement('span');
  spanTime.className = 'time-right';
  const timeText = document.createTextNode(`${message.time}`);

  chat.appendChild(divContainer);
  divContainer.appendChild(pMessage);
  pMessage.appendChild(messageText);
  divContainer.appendChild(spanTime);
  spanTime.appendChild(timeText);
}

function paintRightMessage(message) {
  const chat = document.getElementById('chat');
  const divContainer = document.createElement('div');
  divContainer.className = 'container darker right';
  const pMessage = document.createElement('p');
  const messageText = document.createTextNode(`${message.message}`);
  const spanTime = document.createElement('span');
  spanTime.className = 'time-left';
  const timeText = document.createTextNode(`${message.time}`);

  chat.appendChild(divContainer);
  divContainer.appendChild(pMessage);
  pMessage.appendChild(messageText);
  divContainer.appendChild(spanTime);
  spanTime.appendChild(timeText);
}
