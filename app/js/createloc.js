class CreateLoc {
  constructor() {
      this.regexs = {
      username: /^[a-zA-Z_0-9]*$/,
      word: /^[a-zA-Z_áéíóúñÁÉÍÓÚÑ\s]*$/,
      paragraph: /^[a-zA-Z_áéíóúñÁÉÍÓÚÑ0-9\s\\.,;/\-:'"()!¡?¿*]*$/,
      email: /[_a-z0-9-]+(.[_a-z0-9-]+)*@[a-z0-9-]+(.[a-z0-9-]+)*(.[a-z]{2,4})$/,
      password: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{6,20}$/,
      binary: /^[01]$/,
      number: /^([0-9])+$/,
      decimal: /^\d+\.\d{0,2}$/,
      latLon: /^(\d*\.)?\d+$/,
      postal: /^([0-9]){1,5}$/,
      locationImage: /^locationImages\/file-[a-z0-9]+\.(jpg|jpeg|png)$/,
      serviceImage: /^serviceImages\/file-[a-z0-9]+\.(jpg|jpeg|png)$/,
      profileImage: /^profileImages\/file-[a-z0-9]+\.(jpg|jpeg|png)$/,
    };
  }
  checkForm() {
    this.getElements();
    this.clearElements();
    this.checkRequired();
  }

  getElements() {
    this.elements = [];
    this.elements['numRooms'] = document.getElementById('habitaciones');
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
    Object.values(this.elements).forEach((element) => {
      element.style.borderColor = "#C7C7C7";
    });
  }

  checkRequired() {
    let correct = true;
    Object.values(this.elements).forEach((element) => {
      if (element.selectedIndex === 0) {
        if(element.required) {
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
    return this.regexs[`${element.dataset.regexp}`].test(element.value);
  }

  markElement(element) {
    element.style.borderColor = "red";
  }

};

document.getElementById("btngua").addEventListener("click",function(){
  const createLoc = new CreateLoc();
  createLoc.checkForm();
});
