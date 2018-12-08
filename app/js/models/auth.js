import API from '../api.js';
import Cookie from '../cookie.js';
import goTo from '../util/goTo.js';


const ROUTE = 'auth/';

export async function login({ email, password }) {
  const hash = Cookie.getCookie('session');
  const response = await API.post(`${ROUTE}login`, JSON.stringify({
    email, password,
  }), hash);

  if (response.status >= 200 && response.status < 300) {
    if (response.data.emails[0].verified === 0) {
      goTo('/verifyemail/');
    }
    Cookie.saveCookies(response.data);
    goTo('/users/profile/');
    return true;
  }

  return false;
}

export function logout() {
  const hash = Cookie.getCookie('session');
  if (hash) {
    Cookie.clearCookies();
    API.delete(`${ROUTE}logout`, {}, hash);
  }

  goTo('/');
}

export async function reqPassRecovery({ email }) {
  const response = await API.get(`${ROUTE}reqPasswordRecovery?email=${email}`);

  if (response.status >= 200 && response.status < 300) {
    goTo('/passrecovery/emailsent/');
    return true;
  }

  return false;
}

export async function passRecovery({ hash, password }) {
  const response = await API.post(`${ROUTE}passwordRecovery`, JSON.stringify({
    hash, password,
  }));

  if (response.status >= 200 && response.status < 300) {
    goTo('/passrecovery/newpass/successful/');
    return true;
  }

  return false;
}
