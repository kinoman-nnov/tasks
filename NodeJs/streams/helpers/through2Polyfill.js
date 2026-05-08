const createObjConfig = require('./objConfig.js');

// полифил для "through2"
const { Transform } = require('stream');

function through2(options, transformFn, flushFn) {

  if (typeof options === 'function') {
    flushFn = transformFn;
    transformFn = options;
    options = {};
  }

  options = options || {};

  // Создаём Transform-поток
  const stream = new Transform({

    ...options,

    transform(chunk, encoding, callback) {
      // Вызываем переданную функцию обработки
      if (transformFn) {
        return transformFn.call(this, chunk, encoding, callback);
      }

      this.push(chunk);
      callback();
    },

    flush(callback) {
      // Опциональная финальная логика
      if (flushFn) {
        return flushFn.call(this, callback);
      }

      callback();
    }
  });

  return stream;
}

// поток в objectMode
through2.obj = function (options, transformFn, flushFn) {

  if (typeof options === 'function') {
    flushFn = transformFn;
    transformFn = options;
    options = {};
  }

  const config = createObjConfig(options);

  return through2(config, transformFn, flushFn);
}

through2.parallel = function (options, transformFn, flushFn) {
  if (typeof options === 'function') {
    flushFn = transformFn;
    transformFn = options;
    options = {};
  }

  options = options || {};

  const concurrency =
    options.concurrency != null
      ? Number(options.concurrency)
      : 16

  let running = 0;
  let ended = false;
  let flushCb = null;
  const queue = [];

  function maybeDone(stream) {
    if (ended && running === 0 && queue.length === 0) {
      if (flushFn) {
        return flushFn.call(stream, flushCb);
      }

      flushCb();
    }
  }

  function run(stream) {
    while (running < concurrency && queue.length) {
      const task = queue.shift();

      running++;

      transformFn.call(
        stream,
        task.chunk,
        task.enc,
        function done(err, data) {
          running--;

          if (err) {
            task.cb(err);
            return;
          }

          if (data !== undefined) {
            stream.push(data);
          }

          task.cb();

          run(stream);
          maybeDone(stream);
        }
      )
    }
  }

  return new Transform({
    ...options,

    transform(chunk, enc, cb) {
      queue.push({ chunk, enc, cb });
      run(this);
    },

    flush(cb) {
      ended = true;
      flushCb = cb;
      maybeDone(this);
    }
  });
}

through2.parallel.obj = function (options, transformFn, flushFn) {

  if (typeof options === 'function') {
    flushFn = transformFn;
    transformFn = options;
    options = {};
  }

  const config = createObjConfig(options);

  return through2.parallel(config, transformFn, flushFn);
}

module.exports = through2;