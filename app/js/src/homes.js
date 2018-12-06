import Location from '../models/locationMdl.js';

class LocationsRenderer {
  constructor() {
    LocationsRenderer.locationsContainer = document.getElementById('locations-container');
  }

  static async getLocations() {
    LocationsRenderer.locations = await Location.getAll({
      orderBy: 'cost',
      orderSense: 'ASC',
    }, {
      limitOffset: 0,
      limitCount: 10,
    });
    console.log(LocationsRenderer.locations);
  }

  static renderLocations() {
    console.log(LocationsRenderer.locations);
    LocationsRenderer.locations.forEach((location) => {
      LocationsRenderer.renderOneLocation(location);
    });
  }

  static renderOneLocation(location) {
    const div1 = document.createElement('div');
    div1.className = 'cards';
    let image = undefined;
    if (location.image !== '') {

    }
    const p1 = document.createElement('p');
    const costNode = document.createTextNode(`Precio/mes: ${location.cost}`);
    p1.appendChild(costNode);

    const p2 = document.createElement('p');
    let sex = '';
    switch (location.sexType) {
    case 0:
      sex = 'Hombres';
      break;
    case 1:
      sex = 'Mujeres';
      break;
    case 2:
      sex = 'Ambos';
      break;
    default:
      break;
    }
    const sexNode = document.createTextNode(`Exclusivo para: ${sex}`);
    p2.appendChild(sexNode);

    const div2 = document.createElement('div');
    div2.className = 'card';

    const button = document.createElement('button');
    button.id = `btn-location${location.id}`;
    button.type = 'button';
    button.name = `btn-location${location.id}`;
    button.className = 'button-form button-tam';

    const detailsNode = document.createTextNode('Detalles');

    button.appendChild(detailsNode);
    div2.appendChild(button);


    if (image) {
      div1.appendChild(image);
    }
    div1.appendChild(p1);
    div1.appendChild(p2);
    div1.appendChild(div2);

    LocationsRenderer.locationsContainer.appendChild(div1);
  }
}

async function start() {
  const locationsRenderer = new LocationsRenderer();
  await locationsRenderer.getLocations();
  locationsRenderer.renderLocations();
}

document.addEventListener('DOMContentLoaded', (event) => {
  start();
});
