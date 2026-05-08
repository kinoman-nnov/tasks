// полифил для пакета request
// Возвращает Readable stream, который можно загружать через поток с .pipe()
const https = require('https');
const http = require('http');
const { PassThrough } = require('stream');
const { URL } = require('url');

const normalize = (str) => {
  const u = new URL(str);

  return {
    protocol: u.protocol,
    hostname: u.hostname,
    port: u.port || undefined,
    path: u.pathname + u.search,
    // заголовки для GitHub.com API
    headers: {
      'User-Agent': 'request-polyfill',
      'Accept': '*/*'
    }
  }
}

module.exports = function request(urlStr, callback) {

  const opts = normalize(urlStr);

  const stream = new PassThrough();

  const transport = opts.protocol === 'https:' ? https : http;

  const req = transport.get(opts, (res) => {

    stream.statusCode = res.statusCode;
    stream.headers = res.headers;
    stream.response = res;

    const chunks = [];

    res.on('data', (chunk) => {
      chunks.push(chunk);
    });

    res.on('end', () => {
      const body = Buffer.concat(chunks).toString('utf8');

      if (typeof callback === 'function') {
        callback(null, res, body);
      }
    });

    res.on('error', (err) => {
      stream.emit('error', err);

      if (typeof callback === 'function') {
        callback(err, null, null);
      }
    });
  });

  req.on('error', (err) => {

    stream.emit('error', err);

    if (typeof callback === 'function') {
      callback(err, null, null);
    }
  });

  req.on('response', (res) => {

    stream.emit('response', res);
  });

  return stream;
}