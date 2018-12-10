'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = goTo;
function goTo(url) {
  var _window$location = window.location,
      protocol = _window$location.protocol,
      hostname = _window$location.hostname;
  var port = window.location.port;


  if (port !== '') {
    port = ':' + port;
  }

  window.location.href = protocol + '//' + hostname + port + url;
}