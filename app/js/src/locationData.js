function getLocation() {
  const userId = Cookie.getCookie('locationId');
  const userToken = Cookie.getCookie('locationToken');

  fetch(`${this.host}/location/${locationId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${userToken}`,
    },
  })
    .then(response => response.json())
    .then((data) => {
    // console.log('data=',data);
      if (data.status == 200) {
      // console.log(data);
        paintLocation(data.data.di, data.data.col, data.data.tel, data.data.nom);
        // paintEditModal(data.data.name, data.data.mobile, data.data.email);
        getProgress();
        getCalendars();
      }
    });
}

function paintLocation(di, col, tel, nom) {
  const direccion = document.getElementById('di');
  const colonia = document.getElementById('col');
  const telefono = document.getElementById('tel');
  const nombre = document.getElementById('nom');
  direccion.innerHTML = `<i class="fas fa-user"></i>${di}`;
  colonia.innerHTML = `<i class="fas fa-user"></i>${col}`;
  telefono.innerHTML = `<i class="fa fa-mobile"></i>${tel}`;
  nombre.innerHTML = `<i class="fa fa-envelope"></i>${nom}`;
}
