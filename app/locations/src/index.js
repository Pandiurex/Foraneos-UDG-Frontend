'use strict';

var start = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
    var type, locations, filters, order, limit, _order, _limit;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            type = _cookie2.default.getCookie('type');

            (0, _hideElements.hideElements)(type);

            locations = [];
            filters = correctFilters();

            if (!(filters === undefined)) {
              _context.next = 12;
              break;
            }

            order = {
              orderBy: 'cost',
              orderSense: 'ASC'
            };
            limit = {
              limitOffset: 1,
              limitCount: 9
            };
            _context.next = 9;
            return _location2.default.getAll(order, limit);

          case 9:
            locations = _context.sent;
            _context.next = 18;
            break;

          case 12:
            _order = {
              orderBy: filters.orderBy,
              orderSense: filters.orderSense
            };
            _limit = {
              limitOffset: filters.limitOffset,
              limitCount: filters.limitCount
            };

            updateDorpDown(_order, _limit);

            _context.next = 17;
            return _location2.default.getAll(_order, _limit);

          case 17:
            locations = _context.sent;

          case 18:
            paintLocations(locations);

          case 19:
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

var _cookie = require('../../js/cookie.js');

var _cookie2 = _interopRequireDefault(_cookie);

var _hideElements = require('../../js/util/hideElements.js');

var _goTo = require('../../js/util/goTo.js');

var _goTo2 = _interopRequireDefault(_goTo);

var _location = require('../../js/models/location.js');

var _location2 = _interopRequireDefault(_location);

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

document.getElementById('order-by').addEventListener('change', function () {
  chargeUrl();
});

document.getElementById('order-sense').addEventListener('change', function () {
  chargeUrl();
});

function chargeUrl() {
  var orderBy = document.getElementById('order-by');
  var orderSense = document.getElementById('order-sense');

  var url = '?';

  if (orderBy.selectedIndex === 0) {
    url += 'orderBy=cost';
  } else if (orderBy.selectedIndex === 1) {
    url += 'orderBy=avgRate';
  }
  url += '&';
  if (orderSense.selectedIndex === 0) {
    url += 'orderSense=ASC';
  } else if (orderSense.selectedIndex === 1) {
    url += 'orderSense=DESC';
  }
  window.location.search = url;
}

function updateDorpDown(order, limit) {
  var orderBy = document.getElementById('order-by');
  var orderSense = document.getElementById('order-sense');

  if (order.orderBy === 'cost') {
    orderBy.selectedIndex = 0;
  } else if (order.orderBy === 'avgRate') {
    orderBy.selectedIndex = 1;
  }
  if (order.orderSense === 'ASC') {
    orderSense.selectedIndex = 0;
  } else if (order.orderSense === 'DESC') {
    orderSense.selectedIndex = 1;
  }
}

function correctFilters() {
  var filters = {};

  var orderBy = getParameter('orderBy');
  var orderSense = getParameter('orderSense');
  var limitOffset = getParameter('limitOffset');
  var limitCount = getParameter('limitCount');

  if (orderBy !== undefined && orderSense !== undefined) {
    if ((orderBy === 'cost' || orderBy === 'avgRate') && (orderSense === 'ASC' || orderSense === 'DESC')) {
      filters.orderBy = orderBy;
      filters.orderSense = orderSense;
    }
  }
  if (limitOffset !== undefined && limitCount !== undefined) {
    filters.limitOffset = limitOffset;
    filters.limitCount = limitCount;
  }

  if (Object.keys(filters).length === 0) {
    return undefined;
  }

  return filters;
}

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

function paintLocations(locations) {
  locations.forEach(function (location) {
    paintLocation(location);
  });
}

function paintLocation(location) {
  var divLocationsContainer = document.getElementById('locations-container');
  var divCards = document.createElement('div');
  divCards.className = 'cards';
  var img = document.createElement('img');
  if (location.image === undefined) {
    img.src = '../img/notFound/location.jpg';
  } else {
    img.src = URL.createObjectURL(location.image);
  }
  img.alt = 'Foto del lugar';
  var pPrice = document.createElement('p');
  var priceText = document.createTextNode('Precio/mes: $' + location.cost);
  var pSexType = document.createElement('p');
  var sexType = '';
  if (location.sexType === 0) {
    sexType = 'Hombres';
  } else if (location.sexType === 1) {
    sexType = 'Mujeres';
  } else if (location.sexType === 3) {
    sexType = 'Ambos';
  }
  var sexTypeText = document.createTextNode('Exclusivo para: ' + sexType);
  var divCard = document.createElement('div');
  divCard.className = 'card';
  var button = document.createElement('button');
  button.type = 'button';
  button.className = 'button-form button-tam';
  button.addEventListener('click', function () {
    (0, _goTo2.default)('/locations/location/?l=' + location.id);
  });
  var detailsText = document.createTextNode('Detalles');

  divLocationsContainer.appendChild(divCards);
  divCards.appendChild(img);
  divCards.appendChild(pPrice);
  pPrice.appendChild(priceText);
  divCards.appendChild(pSexType);
  pSexType.appendChild(sexTypeText);
  divCards.appendChild(divCard);
  divCard.appendChild(button);
  button.appendChild(detailsText);
}