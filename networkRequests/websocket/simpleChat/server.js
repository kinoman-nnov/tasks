/**
Перед запуском:
> npm install ws
Далее:
> node server.js
> откройте http://localhost:8080 в вашем браузере
*/

const http = require('http');
const fs = require('fs');
const ws = new require('ws');

const wss = new ws.Server({ noServer: true });

const clients = new Set();

const log = console.log;

function accept(req, res) {

  // все входящие запросы должны использовать websockets
  if (!req.headers.upgrade || req.headers.upgrade.toLowerCase() != 'websocket') {
    res.end();
    return;
  }

  // может быть заголовок Connection: keep-alive, Upgrade
  if (!req.headers.connection.match(/\bupgrade\b/i)) {
    res.end();
    return;
  }

  wss.handleUpgrade(req, req.socket, Buffer.alloc(0), onSocketConnect);
}

function onSocketConnect(ws) {
  clients.add(ws);
  log(`новое подключение`);

  ws.on('message', function (message) {
    log(`получено сообщение: ${message}`);

    message = message.slice(0, 50); // максимальная длина сообщения 50

    for (let client of clients) {
      client.send(message);
    }
  });

  ws.on('close', function () {
    log(`подключение закрыто`);
    clients.delete(ws);
  });
}

if (!module.parent) {

  http.createServer(accept).listen(8080);
  log('Server listening at port 8080');
} else {

  exports.accept = accept;
}