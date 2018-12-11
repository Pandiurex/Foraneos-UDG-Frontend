import API from '../api.js';
import Cookie from '../cookie.js';
import goTo from '../util/goTo.js';
import { clearUndefined } from '../util/list.js';

class Message {
  static async getAll(locationId) {
    const response = await API.get(`locations/${locationId}/messages`, Cookie.getCookie('session'));

    if (response.status >= 200 && response.status < 300) {
      return response.data;
    }
    if (response.status === 403) {
      Cookie.clearCookies();
      goTo('/');
    }

    return [];
  }

  static async post(locationId, message) {
    const hash = Cookie.getCookie('session');
    const response = await API.post('locations/messages', JSON.stringify({
      senderUserId: Cookie.getCookie('user'),
      locationId,
      message,
    }), hash);

    if (response.status >= 200 && response.status < 300) {
      return true;
    }
    if (response.status === 403) {
      Cookie.clearCookies();
      goTo('/');
    }

    return false;
  }
}

export default Message;
