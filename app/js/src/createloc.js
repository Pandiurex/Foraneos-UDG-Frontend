import Location from '../models/location.js';
import Cookie from '../cookie.js';
import regexs from '../util/regexs.js';
import { checkRequired } from '../util/validator.js'
import { getKeyValues, clearUndefined } from '../util/list.js';

document.getElementById('btngua').addEventListener('click', () => {
  checkForm();
});

function checkForm() {
  const elements = getElements();
  const correct = checkRequired(elements);

  if (correct) {
    let values = getKeyValues(elements);
    values = clearUndefined(values);
    // Location.insert(Cookie.getCookie('user'), values);
  } else {
    console.log('Corregir los datos marcados');
  }
}

function getElements() {
  const elements = [];
  elements.numRooms = document.getElementById('habitaciones');
  elements.costElement = document.getElementById('costo');
  elements.genderElement = document.getElementById('genero');
  elements.streetElement = document.getElementById('calle');
  elements.extNumElement = document.getElementById('numext');
  elements.intNumElement = document.getElementById('numint');
  elements.across1Element = document.getElementById('cruce1');
  elements.across2Element = document.getElementById('cruce2');
  elements.colElement = document.getElementById('col');
  elements.postalElement = document.getElementById('cod');
  elements.commentsElement = document.getElementById('comentarios');
  elements.restrictionsElement = document.getElementById('restricciones');
  return elements;
}