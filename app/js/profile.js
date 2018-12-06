import Cookie from './cookie.js';
import Validator from "./Svalidator.js"
window.onload = iniciar;

function iniciar() {
  Cookie.noSession();
  getUser();
}


function getUser(){
  const datos_perfil = document.querySelector('#datos-perfil');
  const username_header = document.querySelector('#username-header');
  const userdate = document.querySelector('#userdate');

  let userId = Cookie.getCookie('user');
  let userToken = Cookie.getCookie('session');

  fetch(`https://api.foraneos-udg.ml/api/users/${userId}`,{
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'hash': `${userToken}`
    }
  })
  .then(response => response.json())
  .then(data => {
    //console.log('data=',data);
    if(data.active==1){
      console.log(data);
      username_header.innerHTML = `<h4>Username: ${data.username}</h4>`;

      datos_perfil.innerHTML =
      `<p>Nombre Completo: ${data.name} ${data.firstSurname} ${data.secondSurname}</p>
      <p>Correo Electronico: ${data.mainEmail}</p>`;

      userdate.innerHTML = `
      <input id="username" type="text" name="username" value=${data.username} class="input3" readonly>
      <input id="name" type="text" name="name" value="${data.name}"  class="input3" readonly>
      <input id="lastname" type="text" name="lastname" value="${data.firstSurname} ${data.secondSurname}" class="input3" readonly>
      <input id="infemail" type="email" name="email" value=${data.mainEmail} class="input3" readonly>
      <input id="regpassword" type="password" name="password" value=${data.password} class="input3" readonly>
      <input id="birthdate" type="date" name="birthdate" value=${data.birthdate} class="input3" readonly>
      `;
    }
  })
  .catch((err) => {
    console.error(err);
  });
}
