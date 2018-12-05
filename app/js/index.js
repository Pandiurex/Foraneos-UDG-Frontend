import Cookie from './cookie.js';
import Validator from "./Svalidator.js"
window.onload = iniciar;

function iniciar() {
  Cookie.haveSession();
  const forms = document.getElementsByClassName('card');
  for (var i = 0; i < forms.length; i++) {
    Validator.listen(forms[i]);
    forms[i].addEventListener('submit',(e)=>{
      e.preventDefault();
      login();
    },false);
  }
}

function login(){
  const login = document.getElementById('input_login');
  const datos = new FormData(login);
  console.log(datos);
  console.log(datos.get('email'));
  console.log(datos.get('password'));

  fetch('https://api.foraneos-udg.ml/api/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams(datos)
  })
    .then(res => res.json())
    .then(data => {
      console.log(data)
      if(data.status==200){
        console.log('200');
          exito(data.hash);
      }else {
        invalido(inputs[0],inputs[1]);
      }
    })
    .catch(err => console.error(err));
}


function exito(userToken){
  let nowTime = new Date();
  nowTime.setTime(nowTime.getTime() + 25*60*1000); // in milliseconds
  document.cookie = `userToken=${userToken};path=/;expires=${nowTime.toGMTString()};`;
  console.log('exito');
  window.location.replace("./profile.html");
  //window.location.replace("file:///home/chrislap/Dropbox/Easy-Motion-Web/src/home.html");
}

function invalido(emailInput,passInput){
  //error a inputs
  passInput.classList.add('error');
  emailInput.classList.add('error');

  //preparar msg y colocarlo al final
  let divPassError = document.createElement('div');
  divPassError.classList.add('error-msg');
  let h1Error = document.createElement('h1');
  let textError = document.createTextNode('Contraseña o correo invalido');
  h1Error.appendChild(textError);
  divPassError.appendChild(h1Error);
  passInput.parentNode.insertBefore(divPassError, passInput.nextSibling);
}







/*const login = document.getElementById('input_login');
login.addEventListener('submit', (e) => {
  e.preventDefault();
  console.log('Click');

  const datos = new FormData(login);

  console.log(datos);
  console.log(datos.get('email'));
  console.log(datos.get('password'));

  fetch('https://api.foraneos-udg.ml/api/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams(datos)
  })
    .then(res => res.json())
    .then(data => {
      console.log(data)
      if(data.status==200){
        console.log('200');
        window.location.href = "./profile.html";
      }
    })
    .catch(err => console.error(err));
});*/
