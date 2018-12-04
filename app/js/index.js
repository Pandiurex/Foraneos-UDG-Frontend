
var login = document.getElementById('input_login');

login.addEventListener('submit', function(e){
  e.preventDefault();
  console.log('Click')

  var datos = new FormData(login);
  const data = new URLSearchParams(new FormData(login));
  const params = new URLSearchParams([...new FormData(e.target).entries()]);
  console.log(datos)
  console.log(datos.get('email'))
  console.log(datos.get('password'))
  console.log(data.get('email'))
  console.log(data.get('password'))
  console.log(params.get('email'))
  console.log(params.get('password'))

  fetch('https://api.foraneos-udg.ml/api/auth/login',{
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: new URLSearchParams( datos.get('email'), datos.get('password') )
  })
  .then(res => res.json())
  .then(data => {
    console.log(data)
  })
  .catch( e => console.error('Error') )
})
