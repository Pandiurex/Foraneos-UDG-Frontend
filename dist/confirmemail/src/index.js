'use strict';

var confirm = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
    var done;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return (0, _auth.confirmEmail)({
              hash: hash,
              email: email
            });

          case 2:
            done = _context.sent;

            if (!done) {
              alert('Token expirado');
            }

          case 4:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function confirm() {
    return _ref.apply(this, arguments);
  };
}();

var _auth = require('../../../js/models/auth.js');

var _cookie = require('../../../js/cookie.js');

var _cookie2 = _interopRequireDefault(_cookie);

var _hideElements = require('../../../js/util/hideElements.js');

var _goTo = require('../../../js/util/goTo.js');

var _goTo2 = _interopRequireDefault(_goTo);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

window.addEventListener('load', start);

var hash = window.location.search;
var email = '';

function start() {
  var type = _cookie2.default.getCookie('type');
  if (type !== undefined) {
    (0, _goTo2.default)('/users/profile/');
  }

  (0, _hideElements.hideElements)(type);

  hash = hash.split('?h=');
  if (hash.length === 1) {
    (0, _goTo2.default)('/');
  }
  hash = hash[1];

  var divisor = hash.split('&email=');
  hash = divisor[0];
  if (divisor[1].length === 1) {
    (0, _goTo2.default)('/');
  }
  email = divisor[1];
  confirm();
}