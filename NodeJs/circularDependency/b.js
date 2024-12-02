exports.loaded = false;

const a = require('./a');

console.log('log after require A from b.js', exports.loaded, a.loaded);

module.exports = {
  aWasLoaded: a.loaded, // false, экспорта из a.js еще не было, модуль не загружен
  loaded: true
}