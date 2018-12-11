import API from '../api.js';
import Cookie from '../cookie.js';
import goTo from '../util/goTo.js';

const ROUTE = 'locationImage';

class LocationImage {
  static async get(image) {
    const url = `${ROUTE}?image=${image}`;
    const response = await API.getImage(url, Cookie.getCookie('session'));

    if (response.status >= 200 && response.status < 300) {
      return response.data;
    }
    if (response.status === 403) {
      Cookie.clearCookies();
      goTo('/');
    }

    return undefined;
  }

  static async post({ locationId, image, description = '' }) {
    const formData = new FormData();
    formData.append('locationId', locationId);
    formData.append('image', image);
    formData.append('description', description);

    const response = await API.postFile(`${ROUTE}`, formData, Cookie.getCookie('session'));

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

export default LocationImage;
