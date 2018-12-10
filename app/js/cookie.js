'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
    }
  }return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
  };
}();

var _api = require('./api.js');

var _api2 = _interopRequireDefault(_api);

var _goTo = require('./util/goTo.js');

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

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

var Cookie = function () {
  function Cookie() {
    _classCallCheck(this, Cookie);
  }

  _createClass(Cookie, null, [{
    key: 'setCookie',
    value: function setCookie(name, value) {
      var date = new Date();
      date.setTime(date.getTime() + 60 * 60 * 1000);
      document.cookie = name + '=' + value + ';path=/;expires=' + date.toGMTString() + ';';
    }
  }, {
    key: 'getCookie',
    value: function getCookie(name) {
      var cookies = '; ' + document.cookie;
      var aux = cookies.split('; ' + name + '=');
      if (aux.length > 1) {
        return aux.pop().split(';').shift();
      }
      return undefined;
    }
  }, {
    key: 'deleteCookie',
    value: function deleteCookie(name) {
      var date = "Thu, 01 Jan 1970 00:00:00 UTC";
      document.cookie = name + '=;path=/;expires=' + date + ';';
    }
  }, {
    key: 'saveCookies',
    value: function saveCookies(_ref) {
      var hash = _ref.hash,
          user = _ref.user,
          type = _ref.type;

      this.setCookie('session', hash);
      this.setCookie('user', user);
      this.setCookie('type', type);
    }
  }, {
    key: 'clearCookies',
    value: function () {
      var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return this.deleteCookie('session');

              case 2:
                _context.next = 4;
                return this.deleteCookie('user');

              case 4:
                _context.next = 6;
                return this.deleteCookie('type');

              case 6:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function clearCookies() {
        return _ref2.apply(this, arguments);
      }

      return clearCookies;
    }()
  }, {
    key: 'noSession',
    value: function noSession() {
      var myToken = this.getCookie('session');
      if (myToken === undefined) {
        (0, _goTo2.default)('/');
      }
    }
  }]);

  return Cookie;
}();

exports.default = Cookie;