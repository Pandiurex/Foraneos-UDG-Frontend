import regexs from '../util/regexs.js';

class CreateLoc {
  checkForm() {
    this.getElements();
    this.clearElements();
    this.checkRequired();
  }

  getElements() {
    this.elements = [];
    this.elements.numRooms = document.getElementById('habitaciones');
    this.elements.costElement = document.getElementById('costo');
    this.elements.genderElement = document.getElementById('genero');
    this.elements.streetElement = document.getElementById('calle');
    this.elements.extNumElement = document.getElementById('numext');
    this.elements.intNumElement = document.getElementById('numint');
    this.elements.across1Element = document.getElementById('cruce1');
    this.elements.across2Element = document.getElementById('cruce2');
    this.elements.colElement = document.getElementById('col');
    this.elements.postalElement = document.getElementById('cod');
    this.elements.commentsElement = document.getElementById('comentarios');
    this.elements.restrictionsElement = document.getElementById('restricciones');
  }

  clearElements() {
    Object.values(this.elements).forEach((element) => {
      element.style.borderColor = '#C7C7C7';
    });
  }

  checkRequired() {
    let correct = true;
    Object.values(this.elements).forEach((element) => {
      if (element.selectedIndex !== undefined) {
        if (element.selectedIndex === 0 && element.required) {
          this.markElement(element);
          correct = false;
        }
        return;
      }
      if (element.required && element.value.length === 0) {
        this.markElement(element);
        correct = false;
      } else if (element.value.length !== 0) {
        if (!this.checkText(element)) {
          this.markElement(element);
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

  checkText(element) {
    return regexs[`${element.dataset.regexp}`].test(element.value);
  }

  markElement(element) {
    element.style.borderColor = "red";
  }
}

document.getElementById('btngua').addEventListener('click', () => {
  const createLoc = new CreateLoc();
  createLoc.checkForm();
});
