'use strict';

var start = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
    var type, locations;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            type = _cookie2.default.getCookie('type');

            (0, _hideElements.hideElements)(type);

            if (type !== '1') {
              (0, _goTo2.default)('/');
            }

            _context.next = 5;
            return _location2.default.getAllFrom(_cookie2.default.getCookie('user'));

          case 5:
            locations = _context.sent;


            paintLocations(locations);

          case 7:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function start() {
    return _ref.apply(this, arguments);
  };
}();

var _cookie = require('../../../../js/cookie.js');

var _cookie2 = _interopRequireDefault(_cookie);

var _hideElements = require('../../../../js/util/hideElements.js');

var _goTo = require('../../../../js/util/goTo.js');

var _goTo2 = _interopRequireDefault(_goTo);

var _location = require('../../../../js/models/location.js');

var _location2 = _interopRequireDefault(_location);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

window.addEventListener('load', start);

function paintLocations(locations) {
  locations.forEach(function (location) {
    paintLocation(location);
  });
}

function paintLocation(location) {
  var divLocationsContainer = document.getElementById('locations-container');
  var divCont = document.createElement('div');
  divCont.className = 'cont';
  var divAdd = document.createElement('div');
  divAdd.className = 'add';
  var img = document.createElement('img');
  if (location.image === undefined) {
    img.src = '../../../../img/notFound/location.jpg';
  } else {
    console.log(location.image);
    img.src = URL.createObjectURL(location.image);
  }
  img.alt = 'Foto del lugar';
  var divAddd = document.createElement('div');
  divAddd.className = 'addd';
  var pAddress = document.createElement('p');
  var address = 'Direcci\xF3n: ' + location.street + ' Int. ' + location.intNum;
  if (location.extNum !== '') {
    address += ' Ext. ' + location.extNum;
  }
  address += ', Col. ' + location.colony;
  var addressText = document.createTextNode(address);
  var pCost = document.createElement('p');
  var costText = document.createTextNode('Costo: $' + location.cost);
  var pRate = document.createElement('p');
  var rateText = document.createTextNode('Calificaci\xF3n: ' + location.avgRate + ' estrellas');
  var ulLista = document.createElement('ul');
  ulLista.className = 'lista';
  ulLista.id = 'tentants' + location.id;
  var divAdd2 = document.createElement('div');
  divAdd2.className = 'add';
  var divBtn = document.createElement('div');
  divBtn.className = 'btn';
  var buttonMsg = document.createElement('button');
  buttonMsg.className = 'button-form button-tam';
  buttonMsg.type = 'button';
  buttonMsg.addEventListener('click', function () {
    (0, _goTo2.default)('/users/profile/locations/messages/?l=' + location.id);
  });
  var messageText = document.createTextNode('Ver mensajes');
  var buttonEdit = document.createElement('button');
  buttonEdit.className = 'button-form button-tam';
  buttonEdit.type = 'button';
  buttonEdit.addEventListener('click', function () {
    (0, _goTo2.default)('/users/profile/locations/update/?l=' + location.id);
  });
  var editText = document.createTextNode('Editar');

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