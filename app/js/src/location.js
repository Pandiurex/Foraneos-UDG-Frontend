import Cookie from '../cookie.js';

window.onload = start;

function start() {
  const type = Cookie.getCookie('type');
  const elementsAdmin = document.getElementsByTagName('admin');
  const elementsTenant = document.getElementsByTagName('tenant');

  console.log(elementsAdmin);
  console.log(elementsOwner);
  console.log(elementsTenant);
  console.log(type);

  setTimeout(() => {
    if (type === 0) {
      Object.values(elementsOwner).forEach((element) => {
        element.style.display = 'none';
      });
      Object.values(elementsTenant).forEach((element) => {
        element.style.display = 'none';
      });
    } else if (type === 1) {
      window.location.replace("./index.html");
    }
  }, 3000);
}
