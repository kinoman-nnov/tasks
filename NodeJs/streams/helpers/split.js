// полифил для пакета split
// Разбивает входящий поток по строкам (\n / \r\n)
const { Transform } = require('stream');

module.exports = function split(mapper, matcher) {
  if (mapper && typeof mapper !== 'function') {
    matcher = mapper;
    mapper = null
  }

  matcher = matcher || /\r?\n/;

  let buffer = '';

  return new Transform({

    readableObjectMode: true,

    transform(chunk, enc, callback) {

      buffer += chunk.toString();

      const parts = buffer.split(matcher);
      buffer = parts.pop(); // удалить последний элемент (остаток неполной строки)

      try {

        for (let line of parts) {

          if (mapper) {
            line = mapper(line);
          }

          this.push(line);
        }

        callback();

      } catch (err) {

        callback(err);
      }
    },

    flush(callback) {

      try {

        if (buffer.length) {
          let line = buffer;

          if (mapper) {
            line = mapper(line);
          }

          this.push(line);
        }

        callback();

      } catch (err) {

        callback(err);
      }
    }
  });
}