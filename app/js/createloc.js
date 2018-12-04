class CreateLoc {
  checkForm() {
    this.getElements();
    this.clearElements();
    this.checkRequired();
  }

  getElements() {
    this.elements = [];
    this.elements['costElement'] = document.getElementById('costo');
    this.elements['genderElement'] = document.getElementById('genero');
    this.elements['streetElement'] = document.getElementById('calle');
    this.elements['extNumElement'] = document.getElementById('numext');
    this.elements['intNumElement'] = document.getElementById('numint');
    this.elements['across1Element'] = document.getElementById('cruce1');
    this.elements['across2Element'] = document.getElementById('cruce2');
    this.elements['colElement'] = document.getElementById('col');
    this.elements['postalElement'] = document.getElementById('cod');
    this.elements['commentsElement'] = document.getElementById('comentarios');
    this.elements['restrictionsElement'] = document.getElementById('restricciones');
  }

  clearElements() {
    // regresarle el color normal a los elementos
  }

  checkRequired() {
    let correct = true;
    Object.values(this.elements).forEach((element) => {
      if (element.required && element.value.length === 0) {
        this.markElement(element);
        correct = false;
      } else if (element.value.length !== 0) {
        if (!this.checkText(element.value)) {
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
    // cada element debera tener un campo regex con el nombre de la 
    // expresion regular con la que debe ser validado
    // Si la cumple retorna verdadero, si no falso
    return true;
  }

  markElement() {
    // Marcar elemento con color rojo
  }

};

const createLoc = new CreateLoc();