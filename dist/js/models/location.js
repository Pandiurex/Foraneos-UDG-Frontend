'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _api = require('../api.js');

var _api2 = _interopRequireDefault(_api);

var _cookie = require('../cookie.js');

var _cookie2 = _interopRequireDefault(_cookie);

var _goTo = require('../util/goTo.js');

var _goTo2 = _interopRequireDefault(_goTo);

var _locationImage = require('./locationImage.js');

var _locationImage2 = _interopRequireDefault(_locationImage);

var _locationService = require('./locationService.js');

var _locationService2 = _interopRequireDefault(_locationService);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ROUTE = 'locations';

var Location = function () {
  function Location(data) {
    var _this = this;

    _classCallCheck(this, Location);

    this.id = data.id;
    this.ownerUserId = data.ownerUserId;
    this.active = data.active;
    this.lattitude = '11.11';
    this.longitude = '11.11';
    this.street = data.street;
    this.colony = data.colony;
    this.postalCode = data.postalCode;
    this.streetAcross1 = data.streetAcross1;
    this.streetAcross2 = data.streetAcross2;
    this.extNum = data.extNum;
    this.intNum = data.intNum;
    this.sexType = data.sexType;
    this.numRooms = data.numRooms;
    this.availableRooms = data.availableRooms;
    this.description = data.description;
    this.restrictions = data.restrictions;
    this.cost = data.cost;
    this.numComplaints = data.numComplaints;
    this.avgRate = data.avgRate;
    this.avgServicesRate = data.avgServicesRate;
    this.avgSecurityRate = data.avgSecurityRate;
    this.avgLocalizationRate = data.avgLocalizationRate;
    this.avgCostBenefictRate = data.avgCostBenefictRate;

    Object.keys(this).forEach(function (key) {
      if (_this[key] !== undefined) {
        delete _this[key];
      }
    });
  }

  _createClass(Location, null, [{
    key: 'getAll',
    value: function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var order = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        var limit = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
        var params, response;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                params = {
                  orderBy: order.orderBy,
                  orderSense: order.orderSense,
                  limitOffset: limit.limitOffset,
                  limitCount: limit.limitCount
                };


                params = this.deleteEmptyKeys(params);
                params = this.processParams(params);

                _context.next = 5;
                return _api2.default.get('' + ROUTE + params, _cookie2.default.getCookie('session'));

              case 5:
                response = _context.sent;

                if (!(response.status >= 200 && response.status < 300)) {
                  _context.next = 8;
                  break;
                }

                return _context.abrupt('return', response.data);

              case 8:
                if (response.status === 403) {
                  _cookie2.default.clearCookies();
                  (0, _goTo2.default)('/');
                }

                return _context.abrupt('return', []);

              case 10:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function getAll() {
        return _ref.apply(this, arguments);
      }

      return getAll;
    }()
  }, {
    key: 'post',
    value: function () {
      var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(_ref2) {
        var _this2 = this;

        var _ref2$lattitude = _ref2.lattitude,
            lattitude = _ref2$lattitude === undefined ? '11.11' : _ref2$lattitude,
            _ref2$longitude = _ref2.longitude,
            longitude = _ref2$longitude === undefined ? '11.11' : _ref2$longitude,
            street = _ref2.street,
            colony = _ref2.colony,
            postalCode = _ref2.postalCode,
            streetAcross1 = _ref2.streetAcross1,
            streetAcross2 = _ref2.streetAcross2,
            extNum = _ref2.extNum,
            intNum = _ref2.intNum,
            sexType = _ref2.sexType,
            numRooms = _ref2.numRooms,
            description = _ref2.description,
            restrictions = _ref2.restrictions,
            cost = _ref2.cost,
            images = _ref2.images,
            services = _ref2.services;
        var hash, response;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                hash = _cookie2.default.getCookie('session');
                _context4.next = 3;
                return _api2.default.post('' + ROUTE, JSON.stringify({
                  ownerUserId: _cookie2.default.getCookie('user'),
                  lattitude: lattitude,
                  longitude: longitude,
                  street: street,
                  colony: colony,
                  postalCode: postalCode,
                  streetAcross1: streetAcross1,
                  streetAcross2: streetAcross2,
                  extNum: extNum,
                  intNum: intNum,
                  sexType: sexType,
                  numRooms: numRooms,
                  description: description,
                  restrictions: restrictions,
                  cost: cost
                }), hash);

              case 3:
                response = _context4.sent;

                if (!(response.status >= 200 && response.status < 300)) {
                  _context4.next = 8;
                  break;
                }

                images.forEach(function () {
                  var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(image) {
                    return regeneratorRuntime.wrap(function _callee2$(_context2) {
                      while (1) {
                        switch (_context2.prev = _context2.next) {
                          case 0:
                            _context2.next = 2;
                            return _locationImage2.default.post({
                              locationId: response.data.id,
                              image: image
                            });

                          case 2:
                          case 'end':
                            return _context2.stop();
                        }
                      }
                    }, _callee2, _this2);
                  }));

                  return function (_x4) {
                    return _ref4.apply(this, arguments);
                  };
                }());
                services.forEach(function () {
                  var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(serviceId) {
                    return regeneratorRuntime.wrap(function _callee3$(_context3) {
                      while (1) {
                        switch (_context3.prev = _context3.next) {
                          case 0:
                            _context3.next = 2;
                            return _locationService2.default.post({
                              locationId: response.data.id,
                              serviceId: serviceId
                            });

                          case 2:
                          case 'end':
                            return _context3.stop();
                        }
                      }
                    }, _callee3, _this2);
                  }));

                  return function (_x5) {
                    return _ref5.apply(this, arguments);
                  };
                }());
                return _context4.abrupt('return', true);

              case 8:
                if (response.status === 403) {
                  _cookie2.default.clearCookies();
                  (0, _goTo2.default)('/');
                }

                return _context4.abrupt('return', false);

              case 10:
              case 'end':
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function post(_x3) {
        return _ref3.apply(this, arguments);
      }

      return post;
    }()
  }, {
    key: 'processResult',
    value: function processResult(data) {
      var result = [];
      data.forEach(function (obj) {
        result.push(new Location(obj));
      });
      return result;
    }
  }]);

  return Location;
}();

exports.default = Location;