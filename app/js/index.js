import Cookie from '../cookie.js';
import { hideElements } from '../util/hideElements.js';

window.addEventListener('load', start);

function start() {
  const type = Cookie.getCookie('type');
  hideElements(type);

  if (type === '1') {
    window.location.replace("./index.html");
  }
}
