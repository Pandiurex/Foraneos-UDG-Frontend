import Cookie from '../../../js/cookie.js';
import { hideElements } from '../../../js/util/hideElements.js';

window.addEventListener('load', start);

function start() {
  const type = Cookie.getCookie('type');
  hideElements(type);
}
