import API from '../api.js';

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

  static async getAll(order = {}, limit = {}) {
    let params = {
      orderBy: order.orderBy,
      orderSense: order.orderSense,
      limitOffset: limit.limitOffset,
      limitCount: limit.limitCount,
    };


    params = this.deleteEmptyKeys(params);
    params = this.processParams(params);
    console.log(params);

    const response = await API.get(`${ROUTE}${params}`, Cookie.getCookie('session'));
    console.log(response);
  }

  static insert(locationImageData) {
    const locationImage = this.processResult(locationImageData)[0];
    API.postFile(ROUTE, location, Cookie.getCookie());
  }

  static processResult(data) {
    const result = [];
    data.forEach((obj) => {
      result.push(new Location(obj));
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

  static processParams(params) {
    let string = '?';
    for (const [key, value] of params) {
      string += `${key}=${value}`;
    }
    return string;
  }
}

export default Location;
