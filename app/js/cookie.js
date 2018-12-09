import API from './api.js';
import goTo from './util/goTo.js';

class Cookie {
  static setCookie(name, value) {
    const date = new Date();
    date.setTime(date.getTime() + 50 * 365 * 24 * 60 * 60 * 1000);
    document.cookie = `${name}=${value};path=/;expires=${date.toGMTString()};`;
  }

  static getCookie(name) {
    const cookies = `; ${document.cookie}`;
    const aux = cookies.split(`; ${name}=`);
    if (aux.length > 1) {
      return aux.pop().split(';').shift();
    }
    return undefined;
  }

  static deleteCookie(name) {
    const date = "Thu, 01 Jan 1970 00:00:00 UTC";
    document.cookie = `${name}=;path=/;expires=${date};`;
  }

  static saveCookies({ hash, user, type }) {
    this.setCookie('session', hash);
    this.setCookie('user', user);
    this.setCookie('type', type);
  }

  static async clearCookies() {
    await this.deleteCookie('session');
    await this.deleteCookie('user');
    await this.deleteCookie('type');
  }

  static noSession() {
    const myToken = this.getCookie('session');
    if (myToken === undefined) {
      goTo('/');
    }
  }
}

export default Cookie;
