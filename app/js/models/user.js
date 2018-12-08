import API from '../api.js';
import Cookie from '../cookie.js';
import goTo from '../util/goTo.js';

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
    if (response.status === 403) {
      goTo('/');
    }

    return undefined;
  }

  static async post({
    userType, username, password, name, firstSurname,
    secondSurname, image, birthdate, gender, mainEmail,
  }) {

    const formData = new FormData();
    formData.append('userType', userType);
    formData.append('username', username);
    formData.append('password', password);
    formData.append('name', name);
    formData.append('firstSurname', firstSurname);
    formData.append('secondSurname', secondSurname);
    formData.append('image', image);
    formData.append('birthdate', birthdate);
    formData.append('gender', gender);
    formData.append('mainEmail', mainEmail);

    const response = await API.postFile(`${ROUTE}`, formData);

    if (response.status >= 200 && response.status < 300) {
      goTo('/registry/emailsent/');
      return true;
    }

    return false;
  }

  static async getProfileImage({ image }) {
    
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
