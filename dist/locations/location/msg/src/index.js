'use strict';

var start = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
    var type, location, messages;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            type = _cookie2.default.getCookie('type');

            (0, _hideElements.hideElements)(type);

            locationId = getParameter('l');
            if (locationId === undefined) {
              goTo('/locations/');
            }

            _context.next = 6;
            return _location2.default.get(locationId);

          case 6:
            location = _context.sent;

            paintLocation(location);

            _context.next = 10;
            return _message2.default.getAll(locationId);

          case 10:
            messages = _context.sent;

            paintMessages(messages);
            console.log(messages);

          case 13:
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

var _location = require('../../../../js/models/location.js');

var _location2 = _interopRequireDefault(_location);

var _message = require('../../../../js/models/message.js');

var _message2 = _interopRequireDefault(_message);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

window.addEventListener('load', start);

var locationId = '';

function getParameter(paramName) {
  var searchString = window.location.search.substring(1);
  var params = searchString.split('&');

  for (var i = 0; i < params.length; i += 1) {
    var val = params[i].split('=');
    if (val[0] === paramName) {
      return val[1];
    }
  }
  return undefined;
}

document.getElementById('btn-send').addEventListener('click', _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
  var message, time;
  return regeneratorRuntime.wrap(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          message = document.getElementById('message');

          if (!(message.value !== '')) {
            _context2.next = 7;
            break;
          }

          _context2.next = 4;
          return _message2.default.post(locationId, message.value);

        case 4:
          time = getActualTime();

          paintRightMessage({
            message: message.value,
            time: time
          });
          message.value = '';

        case 7:
        case 'end':
          return _context2.stop();
      }
    }
  }, _callee2, undefined);
})));

function getActualTime() {
  var date = new Date();
  var year = date.getFullYear();
  var month = date.getMonth() + 1;
  var day = date.getDate();
  var hour = date.getHours();
  var minute = date.getMinutes();
  var second = date.getSeconds();

  var time = [year, month, day].join('-');
  time += ' ';
  time += [hour, minute, second].join(':');

  return time;
}

function paintLocation(location) {
  var locationImage = document.getElementById('location-image');
  locationImage.src = URL.createObjectURL(location.images[0]);
  var address = document.getElementById('address');
  address.value = location.street + ' Int. ' + location.intNum + ', Col. ' + location.colony;
  var cost = document.getElementById('cost');
  cost.value = '$' + location.cost;
}

function paintMessages(messages) {
  var userId = _cookie2.default.getCookie('user');
  messages.forEach(function (message) {
    if (message.senderUserId === Number(userId)) {
      paintRightMessage(message);
    } else {
      paintLeftMessage(message);
    }
  });
}

function paintLeftMessage(message) {
  var chat = document.getElementById('chat');
  var divContainer = document.createElement('div');
  divContainer.className = 'container darker left';
  var pMessage = document.createElement('p');
  var messageText = document.createTextNode('' + message.message);
  var spanTime = document.createElement('span');
  spanTime.className = 'time-right';
  var timeText = document.createTextNode('' + message.time);

  chat.appendChild(divContainer);
  divContainer.appendChild(pMessage);
  pMessage.appendChild(messageText);
  divContainer.appendChild(spanTime);
  spanTime.appendChild(timeText);
}

function paintRightMessage(message) {
  var chat = document.getElementById('chat');
  var divContainer = document.createElement('div');
  divContainer.className = 'container darker right';
  var pMessage = document.createElement('p');
  var messageText = document.createTextNode('' + message.message);
  var spanTime = document.createElement('span');
  spanTime.className = 'time-left';
  var timeText = document.createTextNode('' + message.time);

  chat.appendChild(divContainer);
  divContainer.appendChild(pMessage);
  pMessage.appendChild(messageText);
  divContainer.appendChild(spanTime);
  spanTime.appendChild(timeText);
}