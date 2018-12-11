import API from '../api.js';
import Cookie from '../cookie.js';
import goTo from '../util/goTo.js';
import { clearUndefined } from '../util/list.js';
import LocationImage from './locationImage.js';
import LocationService from './locationService.js';

const ROUTE = 'locations';

class Location {
  constructor(data) {
    this.id = data.id;
    this.ownerUserId = data.ownerUserId;
    this.active = data.active;
    this.lattitude = '11.11';
    this.longitude = '11.11';
    this.street = data.street;
    this.colony = data.colony;
    this.postalCode = data.postalCode;
    this.streetAcross1 = data.streetAcross1;
    this.streetAcross2 = data.streetAcross2;
    this.extNum = data.extNum;
    this.intNum = data.intNum;
    this.sexType = data.sexType;
    this.numRooms = data.numRooms;
    this.availableRooms = data.availableRooms;
    this.description = data.description;
    this.restrictions = data.restrictions;
    this.cost = data.cost;
    this.numComplaints = data.numComplaints;
    this.avgRate = data.avgRate;
    this.avgServicesRate = data.avgServicesRate;
    this.avgSecurityRate = data.avgSecurityRate;
    this.avgLocalizationRate = data.avgLocalizationRate;
    this.avgCostBenefictRate = data.avgCostBenefictRate;

    Object.keys(this).forEach((key) => {
      if (this[key] !== undefined) {
        delete this[key];
      }
    });
  }

  static async get(locationId) {
    const response = await API.get(`${ROUTE}/${locationId}`, Cookie.getCookie('session'));

    if (response.status >= 200 && response.status < 300) { 
      let images = [];
      const myPromises = response.data.images.map(async (image) => {
        images.push(await LocationImage.get(image.image));
      });

      await Promise.all(myPromises);

      response.data.images = images;

      return response.data;
    }
    if (response.status === 403) {
      Cookie.clearCookies();
      goTo('/');
    }

    return undefined;
  }

  static async getAll(order = {}, limit = {}) {
    let params = {
      orderBy: order.orderBy,
      orderSense: order.orderSense,
      limitOffset: limit.limitOffset,
      limitCount: limit.limitCount,
    };

    params = clearUndefined(params);
    params = Location.processParams(params);

    const response = await API.get(`${ROUTE}${params}`, Cookie.getCookie('session'));

    if (response.status >= 200 && response.status < 300) {
      const myPromises = response.data.map(async (data) => {
        data.image = await LocationImage.get(data.image);
      });

      await Promise.all(myPromises);

      return response.data;
    }
    if (response.status === 403) {
      Cookie.clearCookies();
      goTo('/');
    }

    return [];
  }

  static async getAllFrom(userId) {
    const response = await API.get(`${ROUTE}`, Cookie.getCookie('session'));

    if (response.status >= 200 && response.status < 300) {
      let locations = response.data;

      const aux = locations.filter((location) => {
        if (location.ownerUserId === Number(userId)) {
          return true;
        }
        return false;
      });

      locations = aux;

      const myPromises = locations.map(async (location) => {
        location.image = await LocationImage.get(location.image);
      });

      await Promise.all(myPromises);
      console.log(locations);

      return locations;
    }
    if (response.status === 403) {
      Cookie.clearCookies();
      goTo('/');
    }

    return [];
  }

  static async post({
    lattitude = '11.11', longitude = '11.11', street, colony,
    postalCode, streetAcross1, streetAcross2, extNum, intNum,
    sexType, numRooms, description, restrictions, cost,
    images, services,
  }) {
    const hash = Cookie.getCookie('session');
    const response = await API.post(`${ROUTE}`, JSON.stringify({
      ownerUserId: Cookie.getCookie('user'),
      lattitude,
      longitude,
      street,
      colony,
      postalCode,
      streetAcross1,
      streetAcross2,
      extNum,
      intNum,
      sexType,
      numRooms,
      description,
      restrictions,
      cost,
    }), hash);

    if (response.status >= 200 && response.status < 300) {
      images.forEach(async (image) => {
        await LocationImage.post({
          locationId: response.data.id,
          image,
        });
      });
      services.forEach(async (serviceId) => {
        await LocationService.post({
          locationId: response.data.id,
          serviceId,
        });
      });
      return true;
    }
    if (response.status === 403) {
      Cookie.clearCookies();
      goTo('/');
    }

    return false;
  }

  static processParams(params) {
    let string = '?';
    Object.keys(params).forEach((key) => {
      if (params.hasOwnProperty(key)) {
        string += `${key}=${params[key]}&`;
      }
    });
    return string;
  }

  static processResult(data) {
    const result = [];
    data.forEach((obj) => {
      result.push(new Location(obj));
    });
    return result;
  }
}

export default Location;
