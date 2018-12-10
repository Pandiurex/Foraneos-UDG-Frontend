"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getKeyValues = getKeyValues;
exports.clearUndefined = clearUndefined;
function getKeyValues(elements) {
  var aux = [];

  Object.keys(elements).forEach(function (key) {
    if (elements.hasOwnProperty(key)) {
      if (elements[key].selectedIndex !== undefined) {
        aux[key] = elements[key].selectedIndex;
        return;
      }
      aux[key] = elements[key].value;
    }
  });

  return aux;
}

function clearUndefined(elements) {
  var aux = [];
  Object.keys(elements).forEach(function (key) {
    if (elements[key] !== undefined) {
      aux[key] = elements[key];
    }
  });
  return aux;
}