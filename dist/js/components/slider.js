'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Slider = function () {
  function Slider(elements) {
    _classCallCheck(this, Slider);

    this.sliderImages = elements;
    this.arrowLeft = document.getElementById('arrow-left');
    this.arrowRight = document.getElementById('arrow-right');
    this.current = 0;
  }

  _createClass(Slider, [{
    key: 'reset',
    value: function reset() {
      for (var i = 0; i < this.sliderImages.length; i += 1) {
        this.sliderImages[i].style.display = 'none';
      }
    }
  }, {
    key: 'startSlide',
    value: function startSlide() {
      var _this = this;

      this.reset();
      this.sliderImages[0].style.display = 'block';

      this.arrowLeft.addEventListener('click', function () {
        if (_this.current === 0) {
          _this.current = _this.sliderImages.length;
        }
        _this.slideLeft();
      });

      this.arrowRight.addEventListener('click', function () {
        if (_this.current === _this.sliderImages.length - 1) {
          _this.current = -1;
        }
        _this.slideRight();
      }, false);

      setInterval(function () {
        _this.arrowRight.click();
      }, 5000);
    }
  }, {
    key: 'slideLeft',
    value: function slideLeft() {
      this.reset();
      this.sliderImages[this.current - 1].style.display = 'block';
      this.current -= 1;
    }
  }, {
    key: 'slideRight',
    value: function slideRight() {
      this.reset();
      this.sliderImages[this.current + 1].style.display = 'block';
      this.current += 1;
    }
  }]);

  return Slider;
}();

exports.default = Slider;
// const sliderPrincipal = new Slider('sliderprincipal');
// sliderPrincipal.startSlide();