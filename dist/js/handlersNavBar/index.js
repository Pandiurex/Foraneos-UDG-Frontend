'use strict';

var checkForm = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
    var elements, correct, values, done;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            elements = getElements();
            correct = (0, _validator.checkRequired)(elements);

            if (!correct) {
              _context.next = 11;
              break;
            }

            values = (0, _list.getKeyValues)(elements);
            _context.next = 6;
            return (0, _auth.login)(values);

          case 6:
            done = _context.sent;

            console.log(done);
            if (!done) {
              Object.values(elements).forEach(function (element) {
                (0, _validator.markElement)(element);
              });
              console.log('Correo o contrasena incorrectos');
            }
            _context.next = 12;
            break;

          case 11:
            console.log('Corregir los datos marcados');

          case 12:
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

var _auth = require('../models/auth.js');

var _cookie = require('../cookie.js');

var _cookie2 = _interopRequireDefault(_cookie);

var _regexs = require('../util/regexs.js');

var _regexs2 = _interopRequireDefault(_regexs);

var _validator = require('../util/validator.js');

var _list = require('../util/list.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

if (document.getElementById('btn-login')) {
  document.getElementById('btn-login').addEventListener('click', function () {
    checkForm();
  });
}

if (document.getElementById('menu-logout')) {
  document.getElementById('menu-logout').addEventListener('click', function () {
    (0, _auth.logout)();
  });
}

function getElements() {
  var elements = [];
  elements.email = document.getElementById('login-email');
  elements.password = document.getElementById('login-password');
  return elements;
}