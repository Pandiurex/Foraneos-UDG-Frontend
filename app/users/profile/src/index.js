'use strict';

var start = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
    var type, userId, user;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            type = _cookie2.default.getCookie('type');

            if (type === undefined) {
              (0, _goTo2.default)('/');
            }

            (0, _hideElements.hideElements)(type);

            userId = _cookie2.default.getCookie('user');
            _context.next = 6;
            return _user2.default.get(userId);

          case 6:
            user = _context.sent;

            paintUser(user);

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

var paintUser = function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(_ref2) {
    var username = _ref2.username,
        name = _ref2.name,
        firstSurname = _ref2.firstSurname,
        secondSurname = _ref2.secondSurname,
        birthdate = _ref2.birthdate,
        gender = _ref2.gender,
        mainEmail = _ref2.mainEmail,
        profileImage = _ref2.profileImage;
    var date, usernameElement, nameElement, lastnameElement, emailElement, genderElement, birthdateElement, image;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            date = checkDate(birthdate);
            usernameElement = document.getElementById('username');
            nameElement = document.getElementById('name');
            lastnameElement = document.getElementById('lastname');
            emailElement = document.getElementById('infemail');
            genderElement = document.getElementById('gender');
            birthdateElement = document.getElementById('birthdate');

            usernameElement.value = username;
            nameElement.value = name;
            lastnameElement.value = firstSurname + ' ' + secondSurname;
            emailElement.value = mainEmail;
            birthdateElement.value = date;

            if (gender === 0) {
              genderElement.value = 'Hombre';
            } else {
              genderElement.value = 'Mujer';
            }

            _context2.next = 15;
            return _user2.default.getProfileImage(profileImage);

          case 15:
            image = _context2.sent;

            document.getElementById('profile-image').src = URL.createObjectURL(image);

          case 17:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, this);
  }));

  return function paintUser(_x) {
    return _ref3.apply(this, arguments);
  };
}();

var _user = require('../../../js/models/user.js');

var _user2 = _interopRequireDefault(_user);

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

document.getElementById('btnedit').addEventListener('click', function () {
  (0, _goTo2.default)('/users/profile/edit/');
});

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