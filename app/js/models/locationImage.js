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

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

var ROUTE = 'locationImage';

var LocationImage = function () {
  function LocationImage() {
    _classCallCheck(this, LocationImage);
  }

  _createClass(LocationImage, null, [{
    key: 'get',
    value: function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(image) {
        var url, response;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                url = ROUTE + '?image=' + image;
                _context.next = 3;
                return _api2.default.getImage(url, _cookie2.default.getCookie('session'));

              case 3:
                response = _context.sent;

                if (!(response.status >= 200 && response.status < 300)) {
                  _context.next = 6;
                  break;
                }

                return _context.abrupt('return', response.data);

              case 6:
                if (response.status === 403) {
                  _cookie2.default.clearCookies();
                  (0, _goTo2.default)('/');
                }

                return _context.abrupt('return', undefined);

              case 8:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function get(_x) {
        return _ref.apply(this, arguments);
      }

      return get;
    }()
  }, {
    key: 'post',
    value: function () {
      var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(_ref2) {
        var locationId = _ref2.locationId,
            image = _ref2.image,
            _ref2$description = _ref2.description,
            description = _ref2$description === undefined ? '' : _ref2$description;
        var formData, response;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                formData = new FormData();

                formData.append('locationId', locationId);
                formData.append('image', image);
                formData.append('description', description);

                _context2.next = 6;
                return _api2.default.postFile('' + ROUTE, formData, _cookie2.default.getCookie('session'));

              case 6:
                response = _context2.sent;

                if (!(response.status >= 200 && response.status < 300)) {
                  _context2.next = 9;
                  break;
                }

                return _context2.abrupt('return', true);

              case 9:
                if (response.status === 403) {
                  _cookie2.default.clearCookies();
                  (0, _goTo2.default)('/');
                }

                return _context2.abrupt('return', false);

              case 11:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function post(_x2) {
        return _ref3.apply(this, arguments);
      }

      return post;
    }()
  }]);

  return LocationImage;
}();

exports.default = LocationImage;