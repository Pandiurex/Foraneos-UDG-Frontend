const login = document.getElementById('input_login');

login.addEventListener('submit', (e) => {
  e.preventDefault();
  console.log('Click');

  const datos = new FormData(login);
  const datas = new URLSearchParams(new FormData(login));
  const params = new URLSearchParams([...new FormData(e.target).entries()]);
  console.log(datos);
  console.log(datos.get('email'));
  console.log(datos.get('password'));

  fetch('https://api.foraneos-udg.ml/api/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams(datos.get('email'), datos.get('password')),
  })
    .then(res => res.json())
    .then(data => console.log(data))
    .catch(err => console.error(err));
});
