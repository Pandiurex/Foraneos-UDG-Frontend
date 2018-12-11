import Cookie from '../../../../js/cookie.js';
import { hideElements } from '../../../../js/util/hideElements.js';
import goTo from '../../../../js/util/goTo.js';
import Location from '../../../../js/models/location.js';

window.addEventListener('load', start);

async function start() {
  const type = Cookie.getCookie('type');
  hideElements(type);

  if (type !== '1') {
    goTo('/');
  }

  const locations = await Location.getAllFrom(Cookie.getCookie('user'));

  paintLocations(locations);
}

function paintLocations(locations) {
  locations.forEach((location) => {
    paintLocation(location);
  });
}

function paintLocation(location) {
  const divLocationsContainer = document.getElementById('locations-container');
  const divCont = document.createElement('div');
  divCont.className = 'cont';
  const divAdd = document.createElement('div');
  divAdd.className = 'add';
  const img = document.createElement('img');
  if (location.image === undefined) {
    img.src = '../../../../img/notFound/location.jpg';
  } else {
    console.log(location.image);
    img.src = URL.createObjectURL(location.image);
  }
  img.alt = 'Foto del lugar';
  const divAddd = document.createElement('div');
  divAddd.className = 'addd';
  const pAddress = document.createElement('p');
  let address = `Dirección: ${location.street} Int. ${location.intNum}`;
  if (location.extNum !== '') {
    address += ` Ext. ${location.extNum}`;
  }
  address += `, Col. ${location.colony}`;
  const addressText = document.createTextNode(address);
  const pCost = document.createElement('p');
  const costText = document.createTextNode(`Costo: $${location.cost}`);
  const pRate = document.createElement('p');
  const rateText = document.createTextNode(`Calificación: ${location.avgRate} estrellas`);
  const ulLista = document.createElement('ul');
  ulLista.className = 'lista';
  ulLista.id = `tentants${location.id}`;
  const divAdd2 = document.createElement('div');
  divAdd2.className = 'add';
  const divBtn = document.createElement('div');
  divBtn.className = 'btn';
  const buttonMsg = document.createElement('button');
  buttonMsg.className = 'button-form button-tam';
  buttonMsg.type = 'button';
  buttonMsg.addEventListener('click', () => {
    goTo(`/users/profile/locations/messages/?l=${location.id}`);
  });
  const messageText = document.createTextNode('Ver mensajes');
  const buttonEdit = document.createElement('button');
  buttonEdit.className = 'button-form button-tam';
  buttonEdit.type = 'button';
  buttonEdit.addEventListener('click', () => {
    goTo(`/users/profile/locations/update/?l=${location.id}`);
  });
  const editText = document.createTextNode('Editar');

  divLocationsContainer.appendChild(divCont);
  divCont.appendChild(divAdd);
  divAdd.appendChild(img);
  divCont.appendChild(divAddd);
  divAddd.appendChild(pAddress);
  pAddress.appendChild(addressText);
  divAddd.appendChild(pCost);
  pCost.appendChild(costText);
  divAddd.appendChild(pRate);
  pRate.appendChild(rateText);
  divAddd.appendChild(ulLista);
  divCont.appendChild(divAdd2);
  divAdd2.appendChild(divBtn);
  divBtn.appendChild(buttonMsg);
  buttonMsg.appendChild(messageText);
  divBtn.appendChild(buttonEdit);
  buttonEdit.appendChild(editText);
}
