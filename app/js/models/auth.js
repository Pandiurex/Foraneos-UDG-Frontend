'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.confirmEmail = exports.passRecovery = exports.reqPassRecovery = exports.login = undefined;

var login = exports.login = function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(_ref) {
    var email = _ref.email,
        password = _ref.password;
    var hash, response;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            hash = _cookie2.default.getCookie('session');
            _context.next = 3;
            return _api2.default.post(ROUTE + 'login', JSON.stringify({
              email: email, password: password
            }), hash);

          case 3:
            response = _context.sent;

            if (!(response.status >= 200 && response.status < 300)) {
              _context.next = 8;
              break;
            }

            // if (response.data.verified === 0) {
            //   goTo('/verifyemail/');
            //   return true;
            // }
            _cookie2.default.saveCookies(response.data);
            (0, _goTo2.default)('/users/profile/');
            return _context.abrupt('return', true);

          case 8:
            return _context.abrupt('return', false);

          case 9:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function login(_x) {
    return _ref2.apply(this, arguments);
  };
}();

var reqPassRecovery = exports.reqPassRecovery = function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(_ref3) {
    var email = _ref3.email;
    var response;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return _api2.default.get(ROUTE + 'reqPasswordRecovery?email=' + email);

          case 2:
            response = _context2.sent;

            if (!(response.status >= 200 && response.status < 300)) {
              _context2.next = 6;
              break;
            }

            (0, _goTo2.default)('/passrecovery/emailsent/');
            return _context2.abrupt('return', true);

          case 6:
            return _context2.abrupt('return', false);

          case 7:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, this);
  }));

  return function reqPassRecovery(_x2) {
    return _ref4.apply(this, arguments);
  };
}();

var passRecovery = exports.passRecovery = function () {
  var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(_ref5) {
    var hash = _ref5.hash,
        password = _ref5.password;
    var response;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return _api2.default.post(ROUTE + 'passwordRecovery', JSON.stringify({
              hash: hash, password: password
            }));

          case 2:
            response = _context3.sent;

            if (!(response.status >= 200 && response.status < 300)) {
              _context3.next = 6;
              break;
            }

            (0, _goTo2.default)('/passrecovery/newpass/successful/');
            return _context3.abrupt('return', true);

          case 6:
            return _context3.abrupt('return', false);

          case 7:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, this);
  }));

  return function passRecovery(_x3) {
    return _ref6.apply(this, arguments);
  };
}();

var confirmEmail = exports.confirmEmail = function () {
  var _ref8 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(_ref7) {
    var hash = _ref7.hash,
        email = _ref7.email;
    var response;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.next = 2;
            return _api2.default.get(ROUTE + 'confirmEmail?hash=' + hash + '&emailId=' + email);

          case 2:
            response = _context4.sent;

            if (!(response.status >= 200 && response.status < 300)) {
              _context4.next = 5;
              break;
            }

            return _context4.abrupt('return', true);

          case 5:
            return _context4.abrupt('return', false);

          case 6:
          case 'end':
            return _context4.stop();
        }
      }
    }, _callee4, this);
  }));

  return function confirmEmail(_x4) {
    return _ref8.apply(this, arguments);
  };
}();

exports.logout = logout;

var _api = require('../api.js');

var _api2 = _interopRequireDefault(_api);

var _cookie = require('../cookie.js');

var _cookie2 = _interopRequireDefault(_cookie);

var _goTo = require('../util/goTo.js');

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

var ROUTE = 'auth/';

function logout() {
  var hash = _cookie2.default.getCookie('session');
  if (hash) {
    _cookie2.default.clearCookies();
    _api2.default.delete(ROUTE + 'logout', {}, hash);
  }

  (0, _goTo2.default)('/');
}