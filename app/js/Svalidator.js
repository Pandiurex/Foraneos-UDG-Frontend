class Validator {

  static functionsarray(){
    return{
      isMaxLength30: {
        tipo: ['name'],
        metodo: function(x) {   return x.length > 30; },
        msg: 'Es mayor a 30 caracteres',
      },
      isMinLength6: {
        tipo: ['newPassword'],
        metodo: function(x) {   return x.length < 6;},
        msg: 'Es menor a 6 caracteres',
      },
      isMail: {
        tipo: ['email'],
        metodo: function(x) {
          const expresionMail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          return !expresionMail.test(x);
        },
        msg: 'No es un email valido',
      },
      isWord: {
        tipo: ['name'],
        metodo: function(x) {
          const expresionWord = /[a-zA-ZñÑ]{3,}/;
          return !expresionWord.test(x);
        },
        msg: 'No es una palabra valida',
      },
      isVacio: {
        tipo: ['email','password','weight','height','name','mobile'],
        metodo: function(x) {   return x.length == 0; },
        msg: 'Ingrese los datos',
      },
      isWeight: {
        tipo: ['weight'],
        metodo: function(x) {
          return x.length > 3 || (Number(x) < 0 || Number(x) > 250);},
        msg: 'Peso entre 0 y 250kg',
      },
      isHeight: {
        tipo: ['height'],
        metodo: function(x) {   return  x.length > 3  || (Number(x) < 0 || Number(x) > 300); },
        msg: 'Altura entre 0 y 300 CM',
      },
      isSpace:{
        tipo: ['password','name','mobile'],
        metodo: function(x) {
          return x[0] == ' ';
        },
        msg: 'No puede iniciar con espacio',
      },
      isMobile:{
        tipo: ['mobile'],
        metodo: function(x) {  return x.length != 10;},
        msg: 'Ingrese un numero de 10 digitos',
      }

    }
  }

  static validateSomething(type, data){
    let superMsg = [];
    //console.log(type);
    //console.log(data);
    let bigArray = Validator.functionsarray();
    for (var obj in bigArray) {
    	var elements = bigArray[obj]
      if(elements.tipo.indexOf(type)!= -1){
        if(elements.metodo(data)){
          superMsg.push(elements.msg);
        }
      }
      //console.log('primera vuelta');
    }
    return superMsg;
  }

  static deleteErrors() {
    var msgErrors = document.getElementsByClassName('error-msg');

      while(msgErrors.length > 0){
          msgErrors[0].parentNode.removeChild(msgErrors[0]);
      }

      document.querySelectorAll('.error').forEach(function(a) {
        a.classList.remove('error');
      })
  }

  static validate(e){
    let form = e.target.parentNode;
    let msg;
    //delete class error
    Validator.deleteErrors();
    //for input on form
    for(let item of form) {
        //ignorar el submit input
        if(item.type!='submit'){
          //retorna array de msgs de un input
          msg = Validator.validateSomething(item.name, item.value);
          //si hay errores
          if(msg.length > 0){
            e.preventDefault();
            //añade clase error al input
            item.classList.add('error');

            //añade caja de mensajes errres
            var divError = document.createElement('div');
            divError.classList.add('error-msg');
            msg.forEach(function(element) {
              //console.log(element);
              var newErrorMsg = document.createElement('h1');
              var textError = document.createTextNode(element);
              newErrorMsg.appendChild(textError);
              divError.appendChild(newErrorMsg);
              });
              item.parentNode.insertBefore(divError, item.nextSibling);
            }
          }
        }
        //si ya no hay errores
    }

    static listen2(){
      const forms = document.getElementsByClassName('form');
      for(let form of forms){
      //items en formularios
        for(let item of form.children){
            //busca el boton del formulario
            if(item.type == 'submit'){
              item.addEventListener('click', Validator.validate, false);
            }
        }
      }
    }

    static listen(form){
      for(let item of form.children){
          //busca el boton del formulario
          if(item.type == 'submit'){
            item.addEventListener('submit', Validator.validate, false);
          }
      }
    }

    static haiteva(x){
      console.log('x: ', x);
    }

}

export default Validator;
