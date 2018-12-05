import Location from './locationMdl.js';

window.onload = start();

function start() {
  Location.getAll();
}
