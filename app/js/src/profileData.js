function getUser() {
  const userId = Cookie.getCookie('userId');
  const userToken = Cookie.getCookie('userToken');

  fetch(`${this.host}/profile/${userId}`, {
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
        paintUser(data.data.username, data.data.name, data.data.lastname, data.data.email, data.data.password, data.data.birthdate, data.data.gender);
        // paintEditModal(data.data.name, data.data.mobile, data.data.email);
        getProgress();
        getCalendars();
      }
    });
}

function paintUser(username, name, lastname, email, password, birthdate, gender) {
  const username5 = document.getElementById('username');
  const name5 = document.getElementById('name');
  const lastname5 = document.getElementById('lastname');
  const email5 = document.getElementById('infemail');
  const password5 = document.getElementById('regpassword');
  const birthdate5 = document.getElementById('birthdate');
  const gender5 = document.getElementById('gender');
  username5.innerHTML = `<i class="fas fa-user"></i>${username}`;
  name5.innerHTML = `<i class="fas fa-user"></i>${name}`;
  lastname5.innerHTML = `<i class="fa fa-mobile"></i>${lastname}`;
  email5.innerHTML = `<i class="fa fa-envelope"></i>${email}`;
  password5.innerHTML = `<i class="fa fa-envelope"></i>${password}`;
  birthdate5.innerHTML = `<i class="fa fa-envelope"></i>${birthdate}`;
  gender5.innerHTML = `<i class="fa fa-envelope"></i>${gender}`;
}
