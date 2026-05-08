const createObjConfig = require('./objConfig.js');

// полифил для "from2-array"
// from([1,2,3]) обычный Readable
// from.obj([{a:1}, {a:2}]) objectMode
const { Readable } = require('stream');

function fromArray(arr, options) {
  options = options || {};

  if (!Array.isArray(arr)) {
    throw new TypeError('first argument must be an array');
  }

  let ind = 0;

  return new Readable({
    ...options,

    read() {
      while (ind < arr.length) {

        const ok = this.push(arr[ind++]);

        // если буфер заполнен - ждем следующего read()
        if (!ok) return;
      }

      // конец потока
      this.push(null);
    }
  });
}

fromArray.obj = function (arr, options) {

  const config = createObjConfig(options);

  return fromArray(arr, config);
}

module.exports = fromArray;