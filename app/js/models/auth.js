import API from '../api.js';
import Cookie from '../cookie.js';

const ROUTE = 'auth/';

export async function login({ email, password }) {
  const hash = Cookie.getCookie('session');
  const response = await API.post(`${ROUTE}login`, JSON.stringify({
    email, password,
  }), hash);

  if (response.status >= 200 && response.status < 300) {
    Cookie.saveCookies(response.data);
    window.location.pathname = '/users/profile/';
    return true;
  }

  return false;
}

export function logout() {
  const hash = Cookie.getCookie('session');
  if (hash) {
    Cookie.clearCookies();
    API.delete(`${ROUTE}logout`, {}, hash);
    window.location.pathname = '/';
  } else {
    window.location.pathname = '/';
  }
}

export async function reqPassRecovery({ email }) {
  const response = await API.get(`${ROUTE}reqPasswordRecovery?email=${email}`);

  if (response.status >= 200 && response.status < 300) {
    window.location.pathname = '/passrecovery/emailsent/';
    return true;
  }

  return false;
}

export async function passRecovery({ hash, password }) {
  const response = await API.post(`${ROUTE}passwordRecovery`, JSON.stringify({
    hash, password,
  }));

  if (response.status >= 200 && response.status < 300) {
    const { protocol } = window.location;
    const { hostname } = window.location;
    const { port } = window.location;
    const route = '/passrecovery/newpass/successful/';
    window.location.href = `${protocol}//${hostname}:${port}${route}`;

    return true;
  }

  return false;
}
