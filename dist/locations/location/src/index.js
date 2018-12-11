'use strict';

var start = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
    var type, location;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            type = _cookie2.default.getCookie('type');

            (0, _hideElements.hideElements)(type);

            locationId = getParameter('l');
            if (locationId === undefined) {
              (0, _goTo2.default)('/locations/');
            }

            _context.next = 6;
            return _location2.default.get(locationId);

          case 6:
            location = _context.sent;


            paintLocation(location);

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

var _cookie = require('../../../js/cookie.js');

var _cookie2 = _interopRequireDefault(_cookie);

var _hideElements = require('../../../js/util/hideElements.js');

var _goTo = require('../../../js/util/goTo.js');

var _goTo2 = _interopRequireDefault(_goTo);

var _location = require('../../../js/models/location.js');

var _location2 = _interopRequireDefault(_location);

var _slider = require('../../../js/components/slider.js');

var _slider2 = _interopRequireDefault(_slider);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

window.addEventListener('load', start);

var slider = '';
var locationId = '';

document.getElementById('btncon').addEventListener('click', function () {
  var type = _cookie2.default.getCookie('type');
  if (type === undefined || type === 0) {
    (0, _goTo2.default)('' + window.location.pathname + window.location.search + '#login');
  } else {
    (0, _goTo2.default)('/locations/location/msg/?l=' + locationId);
  }
});

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

function paintLocation(location) {
  var availableRooms = document.getElementById('available-rooms');
  var ownerFullname = document.getElementById('owner-fullname');
  var description = document.getElementById('description');
  var restrictions = document.getElementById('restrictions');
  var servicesList = document.getElementById('services-list');

  availableRooms.value = location.availableRooms;
  ownerFullname.value = location.ownerFullname;
  description.value = location.description;
  restrictions.value = location.restrictions;

  location.services.forEach(function (service) {
    var li = document.createElement('li');
    var liText = document.createTextNode('' + service.description);
    servicesList.appendChild(li);
    li.appendChild(liText);
  });

  var sliderElement = document.getElementById('slider');
  var elements = [];

  location.images.forEach(function (image) {
    var divSlide = document.createElement('div');
    divSlide.className = 'slide';
    var urlImage = URL.createObjectURL(image);
    divSlide.style.backgroundImage = 'url(\'' + urlImage + '\')';
    var divSlideContent = document.createElement('div');
    divSlideContent.className = 'slide-content resize-img';

    sliderElement.appendChild(divSlide);
    divSlide.appendChild(divSlideContent);

    elements.push(divSlide);
  });

  slider = new _slider2.default(elements);
  slider.startSlide();
}