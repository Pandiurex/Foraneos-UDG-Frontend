"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var regexs = {
  username: /^[a-zA-Z_0-9]*$/,
  word: /^[a-zA-Z_áéíóúñÁÉÍÓÚÑ\s]*$/,
  paragraph: /^[a-zA-Z_áéíóúñÁÉÍÓÚÑ0-9\s\\.,;/\-:'"()!¡?¿*]*$/,
  email: /[_a-z0-9-]+(.[_a-z0-9-]+)*@[a-z0-9-]+(.[a-z0-9-]+)*(.[a-z]{2,4})$/,
  password: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{6,20}$/,
  binary: /^[01]$/,
  number: /^([0-9])+$/,
  decimal: /^\d+\.\d{0,2}$/,
  latLon: /^(\d*\.)?\d+$/,
  postal: /^([0-9]){1,5}$/,
  locationImage: /^locationImages\/file-[a-z0-9]+\.(jpg|jpeg|png)$/,
  serviceImage: /^serviceImages\/file-[a-z0-9]+\.(jpg|jpeg|png)$/,
  profileImage: /^profileImages\/file-[a-z0-9]+\.(jpg|jpeg|png)$/
};

exports.default = regexs;