'use strict';

var checkForm = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
    var elements, correct, values, done;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            (0, _validator.clearElement)(document.getElementById('image-file'));
            elements = getElements();
            correct = (0, _validator.checkRequired)(elements);

            if (!correct) {
              _context.next = 19;
              break;
            }

            values = (0, _list.getKeyValues)(elements);

            values = (0, _list.clearUndefined)(values);
            if (!correctBirthdate(values.birthdate)) {
              (0, _validator.markElement)(elements.birthdate);
              console.log('Formato o fecha incorrecta en la fecha de nacimiento');
              correct = false;
            }
            if (values.password !== values.password2) {
              (0, _validator.markElement)(elements.password);
              (0, _validator.markElement)(elements.password2);
              console.log('Las contraseñas no coinciden');
              correct = false;
            }
            if (image === '') {
              (0, _validator.markElement)(document.getElementById('image-file'));
              console.log('Debe subir una imagen');
              correct = false;
            }

            if (!correct) {
              _context.next = 17;
              break;
            }

            values.image = image;
            values.userType = userType;
            values.gender = gender;
            _context.next = 15;
            return _user2.default.post(values);

          case 15:
            done = _context.sent;

            if (!done) {
              console.log('Error');
            }

          case 17:
            _context.next = 20;
            break;

          case 19:
            console.log('Corregir los datos marcados');

          case 20:
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

var _user = require('../../js/models/user.js');

var _user2 = _interopRequireDefault(_user);

var _cookie = require('../../js/cookie.js');

var _cookie2 = _interopRequireDefault(_cookie);

var _validator = require('../../js/util/validator.js');

var _list = require('../../js/util/list.js');

var _hideElements = require('../../js/util/hideElements.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

window.addEventListener('load', start);

var image = '';
var userType = '';
var gender = '';

function start() {
  var type = _cookie2.default.getCookie('type');
  if (type !== undefined) {
    window.location.pathname = '/users/profile/';
  }

  (0, _hideElements.hideElements)(type);

  userType = 2;
  gender = 0;
}

document.getElementById('btnregister').addEventListener('click', function () {
  checkForm();
});

document.getElementById('man').addEventListener('click', function () {
  gender = 0;
});

document.getElementById('woman').addEventListener('click', function () {
  gender = 1;
});

document.getElementById('tenant').addEventListener('click', function () {
  userType = 2;
});

document.getElementById('owner').addEventListener('click', function () {
  userType = 1;
});

document.getElementById('image-file').addEventListener('change', function (event) {
  var output = document.getElementById('profile-image');
  image = event.target.files[0];
  output.src = URL.createObjectURL(image);
});

function getElements() {
  var elements = [];
  elements.username = document.getElementById('username');
  elements.name = document.getElementById('name');
  elements.firstSurname = document.getElementById('firstsurname');
  elements.secondSurname = document.getElementById('secondsurname');
  elements.birthdate = document.getElementById('birthdate');
  elements.mainEmail = document.getElementById('regemail');
  elements.password = document.getElementById('regpassword');
  elements.password2 = document.getElementById('confirmpass');
  return elements;
}

function correctBirthdate(date) {
  if (date === undefined) {
    return false;
  }

  var arr = date.split('-');
  var auxDate = new Date(arr[0], arr[1] - 1, arr[2]);

  if (arr.length === 3 && auxDate && Number(arr[0]) === auxDate.getFullYear() && Number(arr[1] - 1) === auxDate.getMonth() && Number(arr[2]) === auxDate.getDate()) {
    return true;
  }
  return false;
}