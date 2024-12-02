exports.loaded = false;

const b = require("./b");

console.log('log after require B from a.js', exports.loaded, b.loaded);

module.exports = {
  bWasLoaded: b.loaded, // true, b загружен
  loaded: true,
}