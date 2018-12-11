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

var _list = require('../util/list.js');

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
    key: 'get',
    value: function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(locationId) {
        var _this2 = this;

        var response, myPromises;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return _api2.default.get(ROUTE + '/' + locationId, _cookie2.default.getCookie('session'));

              case 2:
                response = _context2.sent;

                if (!(response.status >= 200 && response.status < 300)) {
                  _context2.next = 8;
                  break;
                }

                myPromises = response.data.images.map(function () {
                  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(image) {
                    return regeneratorRuntime.wrap(function _callee$(_context) {
                      while (1) {
                        switch (_context.prev = _context.next) {
                          case 0:
                            _context.next = 2;
                            return _locationImage2.default.get(image.image);

                          case 2:
                            image = _context.sent;

                          case 3:
                          case 'end':
                            return _context.stop();
                        }
                      }
                    }, _callee, _this2);
                  }));

                  return function (_x2) {
                    return _ref2.apply(this, arguments);
                  };
                }());
                _context2.next = 7;
                return Promise.all(myPromises);

              case 7:
                return _context2.abrupt('return', response.data);

              case 8:
                if (response.status === 403) {
                  _cookie2.default.clearCookies();
                  (0, _goTo2.default)('/');
                }

                return _context2.abrupt('return', undefined);

              case 10:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function get(_x) {
        return _ref.apply(this, arguments);
      }

      return get;
    }()
  }, {
    key: 'getAll',
    value: function () {
      var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
        var _this3 = this;

        var order = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        var limit = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
        var params, response, myPromises;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                params = {
                  orderBy: order.orderBy,
                  orderSense: order.orderSense,
                  limitOffset: limit.limitOffset,
                  limitCount: limit.limitCount
                };


                params = (0, _list.clearUndefined)(params);
                params = Location.processParams(params);

                _context4.next = 5;
                return _api2.default.get('' + ROUTE + params, _cookie2.default.getCookie('session'));

              case 5:
                response = _context4.sent;

                if (!(response.status >= 200 && response.status < 300)) {
                  _context4.next = 11;
                  break;
                }

                myPromises = response.data.map(function () {
                  var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(data) {
                    return regeneratorRuntime.wrap(function _callee3$(_context3) {
                      while (1) {
                        switch (_context3.prev = _context3.next) {
                          case 0:
                            _context3.next = 2;
                            return _locationImage2.default.get(data.image);

                          case 2:
                            data.image = _context3.sent;

                          case 3:
                          case 'end':
                            return _context3.stop();
                        }
                      }
                    }, _callee3, _this3);
                  }));

                  return function (_x5) {
                    return _ref4.apply(this, arguments);
                  };
                }());
                _context4.next = 10;
                return Promise.all(myPromises);

              case 10:
                return _context4.abrupt('return', response.data);

              case 11:
                if (response.status === 403) {
                  _cookie2.default.clearCookies();
                  (0, _goTo2.default)('/');
                }

                return _context4.abrupt('return', []);

              case 13:
              case 'end':
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function getAll() {
        return _ref3.apply(this, arguments);
      }

      return getAll;
    }()
  }, {
    key: 'getAllFrom',
    value: function () {
      var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(userId) {
        var _this4 = this;

        var response, locations, aux, myPromises;
        return regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                _context6.next = 2;
                return _api2.default.get('' + ROUTE, _cookie2.default.getCookie('session'));

              case 2:
                response = _context6.sent;

                if (!(response.status >= 200 && response.status < 300)) {
                  _context6.next = 12;
                  break;
                }

                locations = response.data;
                aux = locations.filter(function (location) {
                  if (location.ownerUserId === Number(userId)) {
                    return true;
                  }
                  return false;
                });


                locations = aux;

                myPromises = locations.map(function () {
                  var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(location) {
                    return regeneratorRuntime.wrap(function _callee5$(_context5) {
                      while (1) {
                        switch (_context5.prev = _context5.next) {
                          case 0:
                            _context5.next = 2;
                            return _locationImage2.default.get(location.image);

                          case 2:
                            location.image = _context5.sent;

                          case 3:
                          case 'end':
                            return _context5.stop();
                        }
                      }
                    }, _callee5, _this4);
                  }));

                  return function (_x7) {
                    return _ref6.apply(this, arguments);
                  };
                }());
                _context6.next = 10;
                return Promise.all(myPromises);

              case 10:
                console.log(locations);

                return _context6.abrupt('return', locations);

              case 12:
                if (response.status === 403) {
                  _cookie2.default.clearCookies();
                  (0, _goTo2.default)('/');
                }

                return _context6.abrupt('return', []);

              case 14:
              case 'end':
                return _context6.stop();
            }
          }
        }, _callee6, this);
      }));

      function getAllFrom(_x6) {
        return _ref5.apply(this, arguments);
      }

      return getAllFrom;
    }()
  }, {
    key: 'post',
    value: function () {
      var _ref8 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee9(_ref7) {
        var _this5 = this;

        var _ref7$lattitude = _ref7.lattitude,
            lattitude = _ref7$lattitude === undefined ? '11.11' : _ref7$lattitude,
            _ref7$longitude = _ref7.longitude,
            longitude = _ref7$longitude === undefined ? '11.11' : _ref7$longitude,
            street = _ref7.street,
            colony = _ref7.colony,
            postalCode = _ref7.postalCode,
            streetAcross1 = _ref7.streetAcross1,
            streetAcross2 = _ref7.streetAcross2,
            extNum = _ref7.extNum,
            intNum = _ref7.intNum,
            sexType = _ref7.sexType,
            numRooms = _ref7.numRooms,
            description = _ref7.description,
            restrictions = _ref7.restrictions,
            cost = _ref7.cost,
            images = _ref7.images,
            services = _ref7.services;
        var hash, response;
        return regeneratorRuntime.wrap(function _callee9$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
                hash = _cookie2.default.getCookie('session');
                _context9.next = 3;
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
                response = _context9.sent;

                if (!(response.status >= 200 && response.status < 300)) {
                  _context9.next = 8;
                  break;
                }

                images.forEach(function () {
                  var _ref9 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7(image) {
                    return regeneratorRuntime.wrap(function _callee7$(_context7) {
                      while (1) {
                        switch (_context7.prev = _context7.next) {
                          case 0:
                            _context7.next = 2;
                            return _locationImage2.default.post({
                              locationId: response.data.id,
                              image: image
                            });

                          case 2:
                          case 'end':
                            return _context7.stop();
                        }
                      }
                    }, _callee7, _this5);
                  }));

                  return function (_x9) {
                    return _ref9.apply(this, arguments);
                  };
                }());
                services.forEach(function () {
                  var _ref10 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8(serviceId) {
                    return regeneratorRuntime.wrap(function _callee8$(_context8) {
                      while (1) {
                        switch (_context8.prev = _context8.next) {
                          case 0:
                            _context8.next = 2;
                            return _locationService2.default.post({
                              locationId: response.data.id,
                              serviceId: serviceId
                            });

                          case 2:
                          case 'end':
                            return _context8.stop();
                        }
                      }
                    }, _callee8, _this5);
                  }));

                  return function (_x10) {
                    return _ref10.apply(this, arguments);
                  };
                }());
                return _context9.abrupt('return', true);

              case 8:
                if (response.status === 403) {
                  _cookie2.default.clearCookies();
                  (0, _goTo2.default)('/');
                }

                return _context9.abrupt('return', false);

              case 10:
              case 'end':
                return _context9.stop();
            }
          }
        }, _callee9, this);
      }));

      function post(_x8) {
        return _ref8.apply(this, arguments);
      }

      return post;
    }()
  }, {
    key: 'processParams',
    value: function processParams(params) {
      var string = '?';
      Object.keys(params).forEach(function (key) {
        if (params.hasOwnProperty(key)) {
          string += key + '=' + params[key] + '&';
        }
      });
      return string;
    }
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