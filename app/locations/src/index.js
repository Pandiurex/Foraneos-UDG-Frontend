import Cookie from '../../js/cookie.js';
import { hideElements } from '../../js/util/hideElements.js';
import goTo from '../../js/util/goTo.js';
import Location from '../../js/models/location.js';

window.addEventListener('load', start);

async function start() {
  const type = Cookie.getCookie('type');
  hideElements(type);

  let locations = [];
  const filters = correctFilters();
  if (filters === undefined) {
    const order = {
      orderBy: 'cost',
      orderSense: 'ASC',
    };
    const limit = {
      limitOffset: 1,
      limitCount: 9,
    };
    locations = await Location.getAll(order, limit);
  } else {
    const order = {
      orderBy: filters.orderBy,
      orderSense: filters.orderSense,
    };
    const limit = {
      limitOffset: filters.limitOffset,
      limitCount: filters.limitCount,
    };
    updateDorpDown(order, limit);

    locations = await Location.getAll(order, limit);
  }
  paintLocations(locations);
}

document.getElementById('order-by').addEventListener('change', () => {
  chargeUrl();
});

document.getElementById('order-sense').addEventListener('change', () => {
  chargeUrl();
});

function chargeUrl() {
  const orderBy = document.getElementById('order-by');
  const orderSense = document.getElementById('order-sense');

  let url = '?';

  if (orderBy.selectedIndex === 0) {
    url += 'orderBy=cost';
  } else if (orderBy.selectedIndex === 1) {
    url += 'orderBy=avgRate';
  }
  url += '&';
  if (orderSense.selectedIndex === 0) {
    url += 'orderSense=ASC';
  } else if (orderSense.selectedIndex === 1) {
    url += 'orderSense=DESC';
  }
  window.location.search = url;
}

function updateDorpDown(order, limit) {
  const orderBy = document.getElementById('order-by');
  const orderSense = document.getElementById('order-sense');

  if (order.orderBy === 'cost') {
    orderBy.selectedIndex = 0;
  } else if (order.orderBy === 'avgRate') {
    orderBy.selectedIndex = 1;
  }
  if (order.orderSense === 'ASC') {
    orderSense.selectedIndex = 0;
  } else if (order.orderSense === 'DESC') {
    orderSense.selectedIndex = 1;
  }
}

function correctFilters() {
  const filters = {};

  const orderBy = getParameter('orderBy');
  const orderSense = getParameter('orderSense');
  const limitOffset = getParameter('limitOffset');
  const limitCount = getParameter('limitCount');

  if (orderBy !== undefined && orderSense !== undefined) {
    if ((orderBy === 'cost' || orderBy === 'avgRate')
      && (orderSense === 'ASC' || orderSense === 'DESC')) {
      filters.orderBy = orderBy;
      filters.orderSense = orderSense;
    }
  }
  if (limitOffset !== undefined && limitCount !== undefined) {
    filters.limitOffset = limitOffset;
    filters.limitCount = limitCount;
  }

  if (Object.keys(filters).length === 0) {
    return undefined;
  }

  return filters;
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

function paintLocations(locations) {
  locations.forEach((location) => {
    paintLocation(location);
  });
}

function paintLocation(location) {
  const divLocationsContainer = document.getElementById('locations-container')
  const divCards = document.createElement('div');
  divCards.className = 'cards';
  const img = document.createElement('img');
  if (location.image === undefined) {
    img.src = '../img/notFound/location.jpg';
  } else {
    img.src = URL.createObjectURL(location.image);
  }
  img.alt = 'Foto del lugar';
  const pPrice = document.createElement('p');
  const priceText = document.createTextNode(`Precio/mes: $${location.cost}`);
  const pSexType = document.createElement('p');
  let sexType = '';
  if (location.sexType === 0) {
    sexType = 'Hombres';
  } else if (location.sexType === 1) {
    sexType = 'Mujeres';
  } else if (location.sexType === 3) {
    sexType = 'Ambos';
  }
  const sexTypeText = document.createTextNode(`Exclusivo para: ${sexType}`);
  const divCard = document.createElement('div');
  divCard.className = 'card';
  const button = document.createElement('button');
  button.type = 'button';
  button.className = 'button-form button-tam';
  button.addEventListener('click', () => {
    goTo(`/locations/location/?l=${location.id}`);
  });
  const detailsText = document.createTextNode('Detalles');

  divLocationsContainer.appendChild(divCards);
  divCards.appendChild(img);
  divCards.appendChild(pPrice);
  pPrice.appendChild(priceText);
  divCards.appendChild(pSexType);
  pSexType.appendChild(sexTypeText);
  divCards.appendChild(divCard);
  divCard.appendChild(button);
  button.appendChild(detailsText);
}
