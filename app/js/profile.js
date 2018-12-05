const contenido = document.querySelector('#datos_perfil');
const username = document.querySelector('#username');
const datos = document.querySelector('#userdate');
const miInit = {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
    hash: '$2b$17$eaHajr7c9IVgKA1BAiV8FeI/qHAiJiSU8lrM0fT/iHvixR/gC1xqe',
  },
  cache: 'default',
};

fetch('https://api.foraneos-udg.ml/api/users/1', miInit)
  .then(res => res.json())
  .then((data) => {
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
  })
  .catch((err) => {
    console.error(err);
  });
