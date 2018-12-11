'use strict';

var _cookie = require('../../../js/cookie.js');

var _cookie2 = _interopRequireDefault(_cookie);

var _hideElements = require('../../../js/util/hideElements.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

window.addEventListener('load', start);

function start() {
  var type = _cookie2.default.getCookie('type');
  (0, _hideElements.hideElements)(type);
}