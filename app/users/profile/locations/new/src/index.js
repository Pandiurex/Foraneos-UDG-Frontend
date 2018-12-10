'use strict';

var checkForm = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
    var elements, correct, values;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            (0, _validator.clearElement)(document.getElementById('upload-file-container'));
            elements = getElements();
            correct = (0, _validator.checkRequired)(elements);

            if (images.length === 0) {
              (0, _validator.markElement)(document.getElementById('upload-file-container'));
              correct = false;
              console.log('Debe ingresar al menos una imagen');
            }

            if (correct) {
              values = (0, _list.getKeyValues)(elements);

              values = clearSpecificValues(values);
              values = (0, _list.clearUndefined)(values);
              values.cost = values.cost + '.00';
              values.images = images;
              values.services = getServices();
              console.log(values);
              // const done = await Location.post(values);
              // if (done) {
              //   console.log('Todo chido');
              // } else {
              //   console.log('Error');
              // }
            } else {
              console.log('Corregir los datos marcados');
            }

          case 5:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function checkForm() {
    return _ref.apply(this, arguments);
  };
}();

var _location = require('../../../../../js/models/location.js');

var _location2 = _interopRequireDefault(_location);

var _cookie = require('../../../../../js/cookie.js');

var _cookie2 = _interopRequireDefault(_cookie);

var _regexs = require('../../../../../js/util/regexs.js');

var _regexs2 = _interopRequireDefault(_regexs);

var _validator = require('../../../../../js/util/validator.js');

var _list = require('../../../../../js/util/list.js');

var _hideElements = require('../../../../../js/util/hideElements.js');

var _goTo = require('../../../../../js/util/goTo.js');

var _goTo2 = _interopRequireDefault(_goTo);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function _asyncToGenerator(fn) {
  return function () {
    var gen = fn.apply(this, arguments);return new Promise(function (resolve, reject) {
      function step(key, arg) {
        try {
          var info = gen[key](arg);var value = info.value;
        } catch (error) {
          reject(error);return;
        }if (info.done) {
          resolve(value);
        } else {
          return Promise.resolve(value).then(function (value) {
            step("next", value);
          }, function (err) {
            step("throw", err);
          });
        }
      }return step("next");
    });
  };
}

window.addEventListener('load', start);

var images = [];

function start() {
  var type = _cookie2.default.getCookie('type');
  console.log(type);
  (0, _hideElements.hideElements)(type);

  if (type !== '1') {
    (0, _goTo2.default)("/");
  }
}

document.getElementById('btngua').addEventListener('click', function () {
  checkForm();
});

document.getElementById('file-upload').addEventListener('change', function (event) {
  pushImage(event);
});

function getElements() {
  var elements = [];
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
  var services = [];
  for (var i = 1; i <= 13; i += 1) {
    if (document.getElementById('service' + i).checked) {
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
  var inputFile = document.getElementById('file-upload');
  var clone = inputFile.cloneNode();
  clone.value = '';
  inputFile.parentNode.replaceChild(clone, inputFile);

  clone.addEventListener('change', function (event) {
    pushImage(event);
  });
}

function deleteInputFile() {
  var inputFile = document.getElementById('file-uploader');
  inputFile.parentNode.innerHTML = '';
}

function createImgRef(id) {
  var allImages = document.getElementById('all-images');
  var li = document.createElement('li');
  var aImg = document.createElement('a');
  aImg.href = '#img' + id;
  var textImg = document.createTextNode('Ver foto ' + id);

  allImages.appendChild(li);
  li.appendChild(aImg);
  aImg.appendChild(textImg);
}

function createModal(id, image) {
  var leftRef = '';
  var rightRef = '';
  if (id === 0) {
    leftRef = '#img' + (images.length - 1);
  }
  if (id === images.length - 1) {
    rightRef = '#img0';
  }

  var fotoModals = document.getElementById('foto-modals');
  var divModalimg = document.createElement('div');
  divModalimg.className = 'modalimg';
  divModalimg.id = 'img' + id;
  var h4 = document.createElement('h4');
  var textFoto = document.createTextNode('Foto ' + id);
  var divImagen = document.createElement('div');
  divImagen.className = 'imagen';
  var aLeft = document.createElement('a');
  aLeft.href = leftRef;
  var textLeft = document.createTextNode('<');
  var aEmpty = document.createElement('a');
  var img = document.createElement('img');
  img.src = URL.createObjectURL(image);
  img.alt = 'Foto ' + id;
  var aRight = document.createElement('a');
  aRight.href = rightRef;
  var textRight = document.createTextNode('>');
  var aCerrar = document.createElement('a');
  aCerrar.className = 'cerrar';
  aCerrar.href = '#';
  var textCerrar = document.createTextNode('X');

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