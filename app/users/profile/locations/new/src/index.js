import Location from '../../../../../js/models/location.js';
import Cookie from '../../../../../js/cookie.js';
import regexs from '../../../../../js/util/regexs.js';
import { checkRequired, markElement, clearElement } from '../../../../../js/util/validator.js'
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

async function checkForm() {
  clearElement(document.getElementById('upload-file-container'));
  const elements = getElements();
  let correct = checkRequired(elements);

  if (images.length === 0) {
    markElement(document.getElementById('upload-file-container'));
    correct = false;
    console.log('Debe ingresar al menos una imagen');
  }

  if (correct) {
    let values = getKeyValues(elements);
    values = clearSpecificValues(values);
    values = clearUndefined(values);
    values.cost = `${values.cost}.00`;
    values.images = images;
    values.services = getServices();
    const done = await Location.post(values);
    if (done) {
      console.log('Todo chido');
    } else {
      console.log('Error');
    }
  } else {
    console.log('Corregir los datos marcados');
  }
}

function getElements() {
  const elements = [];
  elements.numRooms = document.getElementById('habitaciones');
  elements.cost = document.getElementById('costo');
  elements.sexType = document.getElementById('genero');
  elements.street = document.getElementById('calle');
  elements.extNum = document.getElementById('numext');
  elements.intNum = document.getElementById('numint');
  elements.streetAcross1 = document.getElementById('cruce1');
  elements.streetAcross2 = document.getElementById('cruce2');
  elements.colony = document.getElementById('col');
  elements.postalCode = document.getElementById('cod');
  elements.description = document.getElementById('comentarios');
  elements.restrictions = document.getElementById('restricciones');
  return elements;
}

function clearSpecificValues(values) {
  if (values.streetAcross2 === '') {
    values.streetAcross2 = undefined;
  }
  if (values.intNum === '') {
    values.intNum = undefined;
  }
  if (values.postalCode === '') {
    values.postalCode = undefined;
  }
  if (values.description === '') {
    values.description = undefined;
  }
  if (values.restrictions === '') {
    values.restrictions = undefined;
  }
  return values;
}

function getServices() {
  const services = [];
  for (let i = 1; i <= 13; i += 1) {
    if (document.getElementById(`service${i}`).checked) {
      services.push(i);
    }
  }
  return services;
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
  const inputFile = document.getElementById('file-uploader');
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
