import Cookie from './cookie.js';
import Validator from "./Svalidator.js"
window.onload = iniciar;

function iniciar() {
  Cookie.noSession();
  getUser();

  /*let editProfile = document.getElementById('editProfileButton');
  let closeButtonProfile = document.getElementsByClassName('close-button')[0];
  let editProfileModal = document.getElementsByClassName("modal")[0];

  editProfile.addEventListener("click", ()=>{
    editProfileModal.classList.toggle("show-modal");
  });

  closeButtonProfile.addEventListener("click", ()=>{
      editProfileModal.classList.toggle("show-modal");
  });

  let addProgress= document.getElementById('addProgressButton');
  let closeButtonProgress = document.getElementsByClassName('close-button')[1];
  let addProgressModal = document.getElementsByClassName("modal")[1];

  addProgress.addEventListener("click", ()=>{
    addProgressModal.classList.toggle("show-modal");
  });

  closeButtonProgress.addEventListener("click", ()=>{
      addProgressModal.classList.toggle("show-modal");
  });






  const forms = document.getElementsByClassName('form');
  for (var i = 0; i < forms.length; i++) {
    Validator.listen(forms[i]);
    forms[i].addEventListener('submit',(e)=>{
      e.preventDefault();
      if(form.id == "editProfile"){
        edit();
      }
      else{
        add();
      }
    },false);
  }
}*/



function getUser(){
  const contenido = document.querySelector('#datos_perfil');
  const username = document.querySelector('#username');
  const datos = document.querySelector('#userdate');
  let userId = "1"
  let userToken = Cookie.getCookie('userToken');

  fetch('https://api.foraneos-udg.ml/api/users/1',{
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'hash': `Bearer ${userToken}`
    },
  })
  .then(response => response.json())
  .then(data => {
    //console.log('data=',data);
    if(data.status==200){
      console.log(data);
      username.innerHTML = `<h4>Username: ${data.username}</h4>`;
      contenido.innerHTML = `<p>Nombre Completo: ${data.name} ${data.firstSurname} ${data.secondSurname}</p>
      <p>Correo Electronico: ${data.mainEmail}</p>`;
      datos.innerHTML = `
      <input id="username" type="text" name="username" value=${data.username} class="input3" readonly>
      <input id="name" type="text" name="name" value=${data.name}  class="input3" readonly>
      <input id="lastname" type="text" name="lastname" value="${data.firstSurname} ${data.secondSurname}" class="input3" readonly>
      <input id="infemail" type="email" name="email" value=${data.mainEmail} class="input3" readonly>
      <input id="regpassword" type="password" name="password" value=${data.password} class="input3" readonly>
      <input id="birthdate" type="date" name="birthdate" value=${data.birthdate} class="input3" readonly>
      `;
    }
  })
}
}

/*function paintUser(name, mobile, email){
  let nameh5 = document.getElementById('name');
  let mobileh5 = document.getElementById('mobile');
  let emailh5 = document.getElementById('email');
  nameh5.innerHTML = `<i class="fas fa-user"></i>${name}`;
  mobileh5.innerHTML =`<i class="fa fa-mobile"></i>${mobile}`;
  emailh5.innerHTML = `<i class="fa fa-envelope"></i>${email}`;
}

function paintEditModal(name, mobile, email){

  let inputsEditProfile = document.getElementsByClassName('inputs')[0].children;
  inputsEditProfile[0].value = name;
  inputsEditProfile[1].value = mobile;
  inputsEditProfile[2].value = email;
}

function getProgress(){
  let userId = Cookie.getCookie('userId');
  let userToken = Cookie.getCookie('userToken');

  fetch(`https://easy-motion.herokuapp.com/users/${userId}/progress`,{
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${userToken}`
    },
  })
  .then(response => response.json())
  .then(data => {
    //console.log('data=',data);
    if(data.status==200){
      paintProgress(data.data);
    }
  })
}

function paintProgress(arrayProgress){
  let tBody = document.getElementsByClassName('rowgroup')[1];

  //console.log('array: ',arrayProgress);
  arrayProgress.forEach(function(element) {
    let trElement = document.createElement('tr');
    trElement.classList.add('row');

    let tdFecha = document.createElement('td');
    tdFecha.classList.add('cell');
    let textFecha = document.createTextNode(element.date.slice(0,10));
    tdFecha.appendChild(textFecha);

    let tdWeight = document.createElement('td');
    tdWeight.classList.add('cell');
    let textWeight = document.createTextNode(element.weight);
    tdWeight.appendChild(textWeight);

    let tdHeight = document.createElement('td');
    tdHeight.classList.add('cell');
    let textHeight = document.createTextNode(element.height);
    tdHeight.appendChild(textHeight);

    trElement.appendChild(tdFecha);
    trElement.appendChild(tdWeight);
    trElement.appendChild(tdHeight);


    tBody.appendChild(trElement);
  });

}


function getCalendars(){
  let userId = Cookie.getCookie('userId');
  let userToken = Cookie.getCookie('userToken');

  fetch(`https://easy-motion.herokuapp.com/users/${userId}/calendars`,{
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${userToken}`
    },
  })
  .then(response => response.json())
  .then(data => {
    //console.log('data=',data);
    if(data.status==200){
      paintCalendars(data.data);
    }
  })
}

function paintCalendars(arrayCalendars){
  let calendars = document.getElementsByClassName('calendars')[0];
  //console.log(calendars);
  arrayCalendars.forEach(function(element) {
    //element.id
    //element.name
    //console.log(element);
    let aElement = document.createElement('a');
    aElement.classList.add('calendar');
    let hElement = document.createElement('h4');
    let text = document.createTextNode(element.name);
    aElement.href='./calendar.html';
    hElement.appendChild(text);

    aElement.appendChild(hElement);
  //  console.log(aElement);

    calendars.appendChild(aElement);

  })

}

async function edit(){
  let inputsEditProfile = document.getElementsByClassName('inputs')[0].children;
  let name = inputsEditProfile[0].value;
  let mobile = inputsEditProfile[1].value;
  let email = inputsEditProfile[2].value;
  let updatedUser = await Api.editProfile(name, mobile, email);
  if(updatedUser.status==200){

    //cerrar modal
    let modalEdit = document.getElementsByClassName("modal")[0];
    modalEdit.classList.toggle("show-modal");
    //mod titulos
    paintUser(name, mobile, email);
  }
}

async function add(){
  let inputsAddProgress = document.getElementsByClassName('inputs')[1].children;
  let weight = inputsAddProgress[0].value;
  let height = inputsAddProgress[1].value;

  let newProgress = await Api.addProgress(weight, height);
  if(newProgress.status==201){
    //cerrar modal
    let modalProgress = document.getElementsByClassName("modal")[1];
    modalProgress.classList.toggle("show-modal");
    //mod titulos
    let date = getTime();
    let progress = {date:date, weight:weight, height:height};
    let arrayProgress = [progress];
    paintProgress(arrayProgress);

  }
}

function getTime() {
  let date = new Date();
  let year = date.getFullYear().toString();
  let month = (date.getMonth() + 1).toString();
  let cero = '0';
  let day = cero + date.getDate().toString();

  return `${year}-${month}-${day}`;
}*/
