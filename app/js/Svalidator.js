class Validator {
  static functionsarray() {
    return {
      isMaxLength30: {
        tipo: ['name'],
        metodo(x) {
          return x.length > 30;
        },
        msg: 'Es mayor a 30 caracteres',
      },
      isMinLength6: {
        tipo: ['newPassword'],
        metodo(x) {
          return x.length < 6;
        },
        msg: 'Es menor a 6 caracteres',
      },
      isMail: {
        tipo: ['email'],
        metodo(x) {
          const expresionMail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          return !expresionMail.test(x);
        },
        msg: 'No es un email valido',
      },
      isWord: {
        tipo: ['name'],
        metodo(x) {
          const expresionWord = /[a-zA-ZñÑ]{3,}/;
          return !expresionWord.test(x);
        },
        msg: 'No es una palabra valida',
      },
      isVacio: {
        tipo: ['email', 'password', 'weight', 'height', 'name', 'mobile'],
        metodo(x) {
          return x.length === 0;
        },
        msg: 'Ingrese los datos',
      },
      isWeight: {
        tipo: ['weight'],
        metodo(x) {
          return x.length > 3 || (Number(x) < 0 || Number(x) > 250);
        },
        msg: 'Peso entre 0 y 250kg',
      },
      isHeight: {
        tipo: ['height'],
        metodo(x) {
          return x.length > 3 || (Number(x) < 0 || Number(x) > 300);
        },
        msg: 'Altura entre 0 y 300 CM',
      },
      isSpace: {
        tipo: ['password', 'name', 'mobile'],
        metodo(x) {
          return x[0] === ' ';
        },
        msg: 'No puede iniciar con espacio',
      },
      isMobile: {
        tipo: ['mobile'],
        metodo(x) {
          return x.length !== 10;
        },
        msg: 'Ingrese un numero de 10 digitos',
      },

    };
  }

  static validateSomething(type, data) {
    const superMsg = [];
    // console.log(type);
    // console.log(data);
    const bigArray = Validator.functionsarray();
    for (const obj in bigArray) {
      const elements = bigArray[obj];
      if (elements.tipo.indexOf(type) !== -1) {
        if (elements.metodo(data)) {
          superMsg.push(elements.msg);
        }
      }
      // console.log('primera vuelta');
    }
    return superMsg;
  }

  static deleteErrors() {
    const msgErrors = document.getElementsByClassName('error-msg');

    while (msgErrors.length > 0) {
      msgErrors[0].parentNode.removeChild(msgErrors[0]);
    }

    document.querySelectorAll('.error').forEach((a) => {
      a.classList.remove('error');
    });
  }

  static validate(e) {
    const form = e.target.parentNode;
    let msg;
    // delete class error
    Validator.deleteErrors();
    // for input on form
    for (const item of form) {
      // ignorar el submit input
      if (item.type != 'submit') {
        // retorna array de msgs de un input
        msg = Validator.validateSomething(item.name, item.value);
        // si hay errores
        if (msg.length > 0) {
          e.preventDefault();
          // añade clase error al input
          item.classList.add('error');

          // añade caja de mensajes errres
          var divError = document.createElement('div');
          divError.classList.add('error-msg');
          msg.forEach((element) => {
            // console.log(element);
            const newErrorMsg = document.createElement('h1');
            const textError = document.createTextNode(element);
            newErrorMsg.appendChild(textError);
            divError.appendChild(newErrorMsg);
          });
          item.parentNode.insertBefore(divError, item.nextSibling);
        }
      }
    }
    // si ya no hay errores
  }

  static listen2() {
    const forms = document.getElementsByClassName('form');
    for (const form of forms) {
      // items en formularios
      for (const item of form.children) {
        // busca el boton del formulario
        if (item.type == 'submit') {
          item.addEventListener('click', Validator.validate, false);
        }
      }
    }
  }

  static listen(form) {
    for (const item of form.children) {
      // busca el boton del formulario
      if (item.type == 'submit') {
        item.addEventListener('submit', Validator.validate, false);
      }
    }
  }

  static haiteva(x) {
    console.log('x: ', x);
  }
}

export default Validator;
