'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var host = 'https://api.foraneos-udg.ml/api/';

var API = function () {
  function API() {
    _classCallCheck(this, API);
  }

  _createClass(API, null, [{
    key: 'get',
    value: function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(route) {
        var hash = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;
        var response, status, json;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return fetch('' + host + route, {
                  method: 'GET',
                  headers: {
                    hash: hash
                  }
                });

              case 2:
                response = _context.sent;
                status = response.status;
                _context.next = 6;
                return response.json();

              case 6:
                json = _context.sent;
                return _context.abrupt('return', {
                  status: status,
                  data: json
                });

              case 8:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function get(_x2) {
        return _ref.apply(this, arguments);
      }

      return get;
    }()
  }, {
    key: 'getImage',
    value: function () {
      var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(route) {
        var hash = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;
        var response, status, json;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return fetch('' + host + route, {
                  method: 'GET',
                  headers: {
                    hash: hash
                  }
                });

              case 2:
                response = _context2.sent;
                status = response.status;
                _context2.next = 6;
                return response.blob();

              case 6:
                json = _context2.sent;


                console.log(json);

                return _context2.abrupt('return', {
                  status: status,
                  data: json
                });

              case 9:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function getImage(_x4) {
        return _ref2.apply(this, arguments);
      }

      return getImage;
    }()
  }, {
    key: 'post',
    value: function () {
      var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(route, body) {
        var hash = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : undefined;
        var response, status, json;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.next = 2;
                return fetch('' + host + route, {
                  method: 'POST',
                  body: body,
                  headers: {
                    'Content-Type': 'application/json',
                    hash: hash
                  }
                });

              case 2:
                response = _context3.sent;
                status = response.status;
                _context3.next = 6;
                return response.json();

              case 6:
                json = _context3.sent;
                return _context3.abrupt('return', {
                  status: status,
                  data: json
                });

              case 8:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function post(_x6, _x7) {
        return _ref3.apply(this, arguments);
      }

      return post;
    }()
  }, {
    key: 'postFile',
    value: function () {
      var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(route, body) {
        var hash = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : undefined;
        var response, status, json;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.next = 2;
                return fetch('' + host + route, {
                  method: 'POST',
                  body: body,
                  headers: {
                    hash: hash
                  }
                });

              case 2:
                response = _context4.sent;
                status = response.status;
                _context4.next = 6;
                return response.json();

              case 6:
                json = _context4.sent;
                return _context4.abrupt('return', {
                  status: status,
                  data: json
                });

              case 8:
              case 'end':
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function postFile(_x9, _x10) {
        return _ref4.apply(this, arguments);
      }

      return postFile;
    }()
  }, {
    key: 'update',
    value: function () {
      var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(route, body) {
        var hash = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : undefined;
        var response, status, json;
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _context5.next = 2;
                return fetch('' + host + route, {
                  method: 'PATCH',
                  body: body,
                  headers: {
                    'Content-Type': 'application/json',
                    hash: hash
                  }
                });

              case 2:
                response = _context5.sent;
                status = response.status;
                _context5.next = 6;
                return response.json();

              case 6:
                json = _context5.sent;
                return _context5.abrupt('return', {
                  status: status,
                  data: json
                });

              case 8:
              case 'end':
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      function update(_x12, _x13) {
        return _ref5.apply(this, arguments);
      }

      return update;
    }()
  }, {
    key: 'updateFile',
    value: function () {
      var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(route, body) {
        var hash = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : undefined;
        var response, status, json;
        return regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                _context6.next = 2;
                return fetch('' + host + route, {
                  method: 'PATCH',
                  body: body,
                  headers: {
                    hash: hash
                  }
                });

              case 2:
                response = _context6.sent;
                status = response.status;
                _context6.next = 6;
                return response.json();

              case 6:
                json = _context6.sent;
                return _context6.abrupt('return', {
                  status: status,
                  data: json
                });

              case 8:
              case 'end':
                return _context6.stop();
            }
          }
        }, _callee6, this);
      }));

      function updateFile(_x15, _x16) {
        return _ref6.apply(this, arguments);
      }

      return updateFile;
    }()
  }, {
    key: 'delete',
    value: function () {
      var _ref7 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7(route) {
        var body = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
        var hash = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : undefined;
        var response, status, json;
        return regeneratorRuntime.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                _context7.next = 2;
                return fetch('' + host + route, {
                  method: 'DELETE',
                  body: body,
                  headers: {
                    'Content-Type': 'application/json',
                    hash: hash
                  }
                });

              case 2:
                response = _context7.sent;
                status = response.status;
                _context7.next = 6;
                return response.json();

              case 6:
                json = _context7.sent;
                return _context7.abrupt('return', {
                  status: status,
                  data: json
                });

              case 8:
              case 'end':
                return _context7.stop();
            }
          }
        }, _callee7, this);
      }));

      function _delete(_x19) {
        return _ref7.apply(this, arguments);
      }

      return _delete;
    }()
  }]);

  return API;
}();

exports.default = API;