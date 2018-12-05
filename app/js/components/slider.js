class Slider {
  constructor(sliderId) {
    this.sliderImages = document.querySelectorAll(`#${sliderId} .slide`);
    this.arrowLeft = document.querySelector(`#${sliderId} .arrow-left`);
    this.arrowRight = document.querySelector(`#${sliderId} .arrow-right`);
    this.current = 0;
  }

  reset() {
    for (let i = 0; i < this.sliderImages.length; i += 1) {
      this.sliderImages[i].style.display = 'none';
    }
  }

  startSlide() {
    this.reset();
    this.sliderImages[0].style.display = 'block';

    this.arrowLeft.addEventListener('click', () => {
      if (this.current === 0) {
        this.current = this.sliderImages.length;
      }
      this.slideLeft();
    });

    this.arrowRight.addEventListener('click', () => {
      if (this.current === this.sliderImages.length - 1) {
        this.current = -1;
      }
      this.slideRight();
    }, false);

    setInterval(() => {
      this.arrowRight.click();
    }, 5000);
  }

  slideLeft() {
    this.reset();
    this.sliderImages[this.current - 1].style.display = 'block';
    this.current -= 1;
  }

  slideRight() {
    this.reset();
    this.sliderImages[this.current + 1].style.display = 'block';
    this.current += 1;
  }
}

const sliderPrincipal = new Slider('sliderprincipal');
sliderPrincipal.startSlide();
