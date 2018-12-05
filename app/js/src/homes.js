import Location from '../models/locationMdl.js';

window.onload = start();

function start() {
  Location.getAll();
}
