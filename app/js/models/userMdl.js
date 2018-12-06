import API from '../api.js';
import Cookie from '../cookie.js';

const ROUTE = 'users';

class User {
  constructor(data) {
    this.id = data.id;
    this.mainEmailId = data.mainEmailId;
    this.active = data.active;
    this.userType = data.userType;
    this.username = data.username;
    this.password = data.password;
    this.name = data.name;
    this.firstSurname = data.firstSurname;
    this.secondSurname = data.secondSurname;
    this.profileImage = data.profileImage;
    this.birthdate = data.birthdate;
    this.gender = data.gender;

    Object.keys(this).forEach((key) => {
      if (this[key] === undefined) { delete this[key]; }
    });
  }

  static async get(userId) {
    const response = await API.get(`${ROUTE}/${userId}`, Cookie.getCookie('session'));

    if (response.status >= 200 && response.status < 300) {
      return response.data;
    }
    return undefined;
  }

  static async patch(userId, body) {
    const response = await API.updateFile(`${ROUTE}/${userId}`, body, Cookie.getCookie('session'));

    if (response.status >= 200 && response.status < 300) {
      return response.data;
    }
    return undefined;
  }

  static async insert(user, userData) {
    const location = this.processResult(userData)[0];
    location.ownerUserId = user.id;
    const response = await API.insert(ROUTE, location, Cookie.getCookie());

    if (response.status >= 200 && response.status < 300) {
      return response.data;
    }
    return undefined;
  }

  static processResult(data) {
    const result = [];
    data.forEach((obj) => {
      result.push(new User(obj));
    });
    return result;
  }

  static deleteEmptyKeys(obj) {
    const aux = [];
    Object.keys(obj).forEach((key) => {
      if (obj[key] !== undefined) {
        aux[key] = obj[key];
      }
    });
    return aux;
  }
}

export default User;
