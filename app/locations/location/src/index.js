import Cookie from '../../../js/cookie.js';
import { hideElements } from '../../../js/util/hideElements.js';
import goTo from '../../../js/util/goTo.js';
import Location from '../../../js/models/location.js';

window.addEventListener('load', start);

async function start() {
  const type = Cookie.getCookie('type');
  hideElements(type);

  const locationId = getParameter('l');
  if (locationId === undefined) {
    goTo('/locations/');
  }

  const location = await Location.get(locationId);
  paintLocation(location);
}

document.getElementById('btncon').addEventListener('click', () => {
  const type = Cookie.getCookie('type');
  if (type === undefined || type === 0) {
    goTo(`${window.location.pathname}${window.location.search}#login`);
  }
});

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

function paintLocation(location) {
  const availableRooms = document.getElementById('available-rooms');
  const ownerFullname = document.getElementById('owner-fullname');
  const description = document.getElementById('description');
  const restrictions = document.getElementById('restrictions');
  const servicesList = document.getElementById('services-list');

  availableRooms.value = location.availableRooms;
  ownerFullname.value = location.ownerFullname;
  description.value = location.description;
  restrictions.value = location.restrictions;

  console.log(location);

  location.services.forEach((service) => {
    const li = document.createElement('li');
    const liText = document.createTextNode(`${service.description}`);
    servicesList.appendChild(li);
    li.appendChild(liText);
  });
}
