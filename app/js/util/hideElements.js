'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.hideElements = hideElements;
exports.hide = hide;
exports.showElements = showElements;
exports.showParentNode = showParentNode;
exports.show = show;
function hideElements(type) {
  var admin = document.getElementsByTagName('admin');
  var owner = document.getElementsByTagName('owner');
  var tenant = document.getElementsByTagName('tenant');
  var visitant = document.getElementsByTagName('visitant');

  if (type === '0') {
    hide(owner);
    hide(tenant);
    hide(visitant);
    showElements(admin);
  } else if (type === '1') {
    hide(admin);
    hide(tenant);
    hide(visitant);
    showElements(owner);
  } else if (type === '2') {
    hide(admin);
    hide(owner);
    hide(visitant);
    showElements(tenant);
  } else {
    hide(admin);
    hide(owner);
    hide(tenant);
    showElements(visitant);
  }
}

function hide(elements) {
  Object.values(elements).forEach(function (element) {
    element.style.display = 'none';
  });
}

function showElements(elements) {
  Object.values(elements).forEach(function (element) {
    show(element);
    showParentNode(element);
  });
}

function showParentNode(element) {
  var aux = element.parentNode;

  if (aux.tagName === 'ADMIN' || aux.tagName === 'OWNER' || aux.tagName === 'TENANT' || aux.tagName === 'VISITANT') {
    show(aux);
    showParentNode(aux);
  }

  return;
}

function show(element) {
  if (element !== null) {
    if (element.style !== undefined) {
      element.style.display = 'block';
    }
    show(element.firstChild);
  }
}