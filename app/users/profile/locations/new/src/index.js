import Location from '../../../../../js/models/location.js';
import Cookie from '../../../../../js/cookie.js';
import regexs from '../../../../../js/util/regexs.js';
import { checkRequired } from '../../../../../js/util/validator.js'
import { getKeyValues, clearUndefined } from '../../../../../js/util/list.js';
import { hideElements } from '../../../../../js/util/hideElements.js';
import goTo from '../../../../../js/util/goTo.js';

window.addEventListener('load', start);

const images = [];

function start() {
  const type = Cookie.getCookie('type');
  console.log(type);
  hideElements(type);

  if (type !== '1') {
    goTo("/");
  }
}

document.getElementById('btngua').addEventListener('click', () => {
  checkForm();
});

document.getElementById('file-upload').addEventListener('change', (event) => {
  pushImage(event);
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

function pushImage(event) {
  images.push(event.target.files[0]);
  console.log(images);

  if (images.length === 5) {
    deleteInputFile();
  } else {
    recreateInputFile();
  }

  createModal(images.length, images[images.length - 1]);
  createImgRef(images.length);
}

function recreateInputFile() {
  const inputFile = document.getElementById('file-upload');
  const clone = inputFile.cloneNode();
  clone.value = '';
  inputFile.parentNode.replaceChild(clone, inputFile);

  clone.addEventListener('change', (event) => {
    pushImage(event);
  });
}

function deleteInputFile() {
  const inputFile = document.getElementById('file-upload');
  inputFile.parentNode.innerHTML = '';
}

function createImgRef(id) {
  const allImages = document.getElementById('all-images');
  const li = document.createElement('li');
  const aImg = document.createElement('a');
  aImg.href = `#img${id}`;
  const textImg = document.createTextNode(`Ver foto ${id}`);

  allImages.appendChild(li);
  li.appendChild(aImg);
  aImg.appendChild(textImg);
}

function createModal(id, image) {
  let leftRef = '';
  let rightRef = '';
  if (id === 0) {
    leftRef = `#img${images.length - 1}`;
  }
  if (id === images.length - 1) {
    rightRef = '#img0';
  }

  const fotoModals = document.getElementById('foto-modals');
  const divModalimg = document.createElement('div');
  divModalimg.className = 'modalimg';
  divModalimg.id = `img${id}`;
  const h4 = document.createElement('h4');
  const textFoto = document.createTextNode(`Foto ${id}`);
  const divImagen = document.createElement('div');
  divImagen.className = 'imagen';
  const aLeft = document.createElement('a');
  aLeft.href = leftRef
  const textLeft = document.createTextNode('<');
  const aEmpty = document.createElement('a');
  const img = document.createElement('img');
  img.src = URL.createObjectURL(image);
  img.alt = `Foto ${id}`;
  const aRight =  document.createElement('a');
  aRight.href = rightRef;
  const textRight = document.createTextNode('>');
  const aCerrar = document.createElement('a');
  aCerrar.className = 'cerrar';
  aCerrar.href = '#';
  const textCerrar = document.createTextNode('X');

  fotoModals.appendChild(divModalimg);
  divModalimg.appendChild(h4);
  divModalimg.appendChild(divImagen);
  divModalimg.appendChild(aCerrar);
  h4.appendChild(textFoto);
  divImagen.appendChild(aLeft);
  divImagen.appendChild(aEmpty);
  divImagen.appendChild(aRight);
  aLeft.appendChild(textLeft);
  aEmpty.appendChild(img);
  aRight.appendChild(textRight);
  aCerrar.appendChild(textCerrar);
}
