'use strict';

var start = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
    var type, msgid, msg;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            type = _cookie2.default.getCookie('type');

            if (type === undefined) {
              (0, _goTo2.default)('/');
            }

            (0, _hideElements.hideElements)(type);

            msgid = _cookie2.default.getCookie('msg');
            _context.next = 6;
            return _msg2.default.get(msgId);

          case 6:
            msg = _context.sent;

            paintMsg(msg);

          case 8:
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

var _msg = require('../../../js/models/msg.js');

var _msg2 = _interopRequireDefault(_msg);

var _cookie = require('../../../js/cookie.js');

var _cookie2 = _interopRequireDefault(_cookie);

var _hideElements = require('../../../js/util/hideElements.js');

var _goTo = require('../../../js/util/goTo.js');

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

window.addEventListener('load', start);

document.getElementById('btnsend').addEventListener('click', function () {
  (0, _goTo2.default)('/users/profile/locations/tenant/');
});

function paintMsg(_ref2) {
  var senderUserId = _ref2.senderUserId,
      locationId = _ref2.locationId,
      messege = _ref2.messege;

  var date = checkDate(birthdate);

  var msgRecieve = document.getElementById('msg-recieve');
  var msgSend = document.getElementById('msg-send');

  msgRecieve.value = messege;
  msgSend.value = messege;

  if (gender === 0) {
    genderElement.value = 'Hombre';
  } else {
    genderElement.value = 'Mujer';
  }

  // const image = await User.getProfileImage(profileImage);
}

function scrollDown() {
  var objDiv = document.getElementById('chat');
  objDiv.scrollTop = objDiv.scrollHeight;
}

function checkDate(date) {
  var auxDate = date.split('-');

  var day = auxDate[2];
  var month = auxDate[1];
  var year = auxDate[0];

  if (day < 10) {
    day = '0' + day;
  }
  if (month < 10) {
    month = '0' + month;
  }

  return day + '/' + month + '/' + year;
}