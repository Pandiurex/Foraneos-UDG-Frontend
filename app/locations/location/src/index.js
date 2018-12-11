import Cookie from '../../../js/cookie.js';
import { hideElements } from '../../../js/util/hideElements.js';
import goTo from '../../../js/util/goTo.js';
import Location from '../../../js/models/location.js';
import Slider from '../../../js/components/slider.js';

window.addEventListener('load', start);

let slider = '';
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
}

document.getElementById('btncon').addEventListener('click', () => {
  const type = Cookie.getCookie('type');
  if (type === undefined || type === 0) {
    goTo(`${window.location.pathname}${window.location.search}#login`);
  } else {
    goTo(`/locations/location/msg/?l=${locationId}`);
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

  location.services.forEach((service) => {
    const li = document.createElement('li');
    const liText = document.createTextNode(`${service.description}`);
    servicesList.appendChild(li);
    li.appendChild(liText);
  });

  const sliderElement = document.getElementById('slider');
  const elements = [];

  location.images.forEach((image) => {
    const divSlide = document.createElement('div');
    divSlide.className = 'slide';
    const divSlideContent = document.createElement('div');
    divSlideContent.className = 'slide-content resize-img';
    const img = document.createElement('img');
    img.src = URL.createObjectURL(image);

    sliderElement.appendChild(divSlide);
    divSlide.appendChild(divSlideContent);
    divSlideContent.appendChild(img);

    elements.push(divSlide);
  });

  slider = new Slider(elements);
  slider.startSlide();
}
