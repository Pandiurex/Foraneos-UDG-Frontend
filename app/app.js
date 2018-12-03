
var login = document.getElementById('input_login');

login.addEventListener('submit', function(e){
  e.preventDefault();
  console.log('Click')

  var datos = new FormData(login);
  datos.append('email', 'emmanuel_12_gc@hotmail.com');
  datos.append('password', 'Emmanuel123');

  console.log(datos)
  console.log(datos.get('email'))
  console.log(datos.get('password'))

  fetch('https://api.foraneos-udg.ml/api/auth/login',{
    method: 'POST',
    body: 'datos'
  })
  .then(res => res.json())
  .then(data => {
    console.log(data)
  })
  .catch( e => console.error('Error') )
})
