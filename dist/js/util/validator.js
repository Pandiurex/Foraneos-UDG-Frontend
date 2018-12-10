'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.checkRequired = checkRequired;
exports.clearElements = clearElements;
exports.checkText = checkText;
exports.markElement = markElement;
exports.clearElement = clearElement;

var _regexs = require('./regexs.js');

var _regexs2 = _interopRequireDefault(_regexs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function checkRequired(elements) {
  clearElements(elements);

  var correct = true;
  Object.values(elements).forEach(function (element) {
    if (element.selectedIndex !== undefined) {
      return;
    }
    if (element.required && element.value.length === 0) {
      markElement(element);
      correct = false;
    } else if (element.value.length !== 0) {
      if (!checkText(element)) {
        markElement(element);
        correct = false;
      }
    }
  });
  return correct;
}

function clearElements(elements) {
  Object.values(elements).forEach(function (element) {
    clearElement(element);
  });
}

function checkText(element) {
  return _regexs2.default['' + element.dataset.regexp].test(element.value);
}

function markElement(element) {
  element.style.borderColor = 'red';
}

function clearElement(element) {
  element.style.borderColor = '#C7C7C7';
}