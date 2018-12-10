'use strict';

var _createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
    }
  }return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
  };
}();

var _cookie = require('../../../../../../js/cookie.js');

var _cookie2 = _interopRequireDefault(_cookie);

var _regexs = require('../../../../../../js/util/regexs.js');

var _regexs2 = _interopRequireDefault(_regexs);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

var Update = function () {
  function Update() {
    _classCallCheck(this, Update);
  }

  _createClass(Update, [{
    key: 'checkForm',
    value: function checkForm() {
      this.getElements();
      this.clearElements();
      this.checkRequired();
    }
  }, {
    key: 'getElements',
    value: function getElements() {
      this.elements = [];
      this.elements.numRooms = document.getElementById('habitaciones');
      this.elements.costElement = document.getElementById('costo');
      this.elements.genderElement = document.getElementById('genero');
      this.elements.postalElement = document.getElementById('cod');
      this.elements.commentsElement = document.getElementById('comentarios');
      this.elements.restrictionsElement = document.getElementById('restricciones');
    }
  }, {
    key: 'clearElements',
    value: function clearElements() {
      Object.values(this.elements).forEach(function (element) {
        element.style.borderColor = '#C7C7C7';
      });
    }
  }, {
    key: 'checkRequired',
    value: function checkRequired() {
      var _this = this;

      var correct = true;
      Object.values(this.elements).forEach(function (element) {
        if (element.selectedIndex !== undefined) {
          if (element.selectedIndex === 0 && element.required) {
            _this.markElement(element);
            correct = false;
          }
          return;
        }
        if (element.required && element.value.length === 0) {
          _this.markElement(element);
          correct = false;
        } else if (element.value.length !== 0) {
          if (!_this.checkText(element)) {
            _this.markElement(element);
            correct = false;
          }
        }
      });

      if (correct) {
        // enviar los VALORES al modelo
        console.log('Enviando al modelo');
      } else {
        console.log('Corregir los datos marcados');
      }
    }
  }, {
    key: 'checkText',
    value: function checkText(element) {
      return _regexs2.default['' + element.dataset.regexp].test(element.value);
    }
  }, {
    key: 'markElement',
    value: function markElement(element) {
      element.style.borderColor = 'red';
    }
  }]);

  return Update;
}();

document.getElementById('btngua').addEventListener('click', function () {
  var update = new Update();
  update.checkForm();
});