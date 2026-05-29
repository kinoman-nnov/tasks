const http = require('node:http');
const Clock = require('./serverClock');

// переменные окружения INTERVAL=1000 DURATION=10000
const interval = parseInt(process.env.INTERVAL, 10) || 1000; // интервал в мс
const duration = parseInt(process.env.DURATION, 10) || 10000; // временной промежуток в мс

function createServerPromisify(host, port, handler) {
  return new Promise((resolve, reject) => {

    const server = http.createServer(handler);

    server.listen(port, host, () => {
      console.log(`Server running at http://${host}:${port}/`);
      resolve(server);
    });

    server.on('error', (err) => {
      reject(err);
    });

    server.on('close', () => {
      console.log('Сервер остановлен. Завершаем активные соединения...');
    });
  });
}

function handleTickStream(clock) {
  const activeConnections = new Set();

  const closeConnections = () => {
    for (const res of activeConnections) {
      if (!res.finished) {
        res.end('Сервер выключается.\n');
      }
    }
    activeConnections.clear();
  }

  return {
    requestHandler: function (req, res) {
      try {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain; charset=utf-8');

        const connectionId = `${req.socket.remoteAddress}:${req.socket.remotePort}`;
        let isDisconnected = false;

        console.log(`CLIENT ${connectionId} connected!`);

        activeConnections.add(res);

        const onTick = (time) => {
          if (!res.finished) {
            res.write(`CLIENT: ${time}\n`);
          }
        }

        const disconnectClient = (res, connectionId) => {
          if (isDisconnected) return;
          isDisconnected = true;
          clock.off('tick', onTick);
          activeConnections.delete(res);

          console.log(`CLIENT ${connectionId} disconnected!`);
        };

        clock.on('tick', onTick);

        req.on('close', () => disconnectClient(res, connectionId));

        req.on('error', (err) => {
          console.error(`Ошибка при обработке запроса от ${connectionId}:`, err);
          if (!res.finished) {
            res.statusCode = 500;

            res.end('Internal Server Error');
          }
        });

        setTimeout(() => {
          disconnectClient(res, connectionId);

          res.end(`END`);
        }, duration);

      } catch (err) {
        res.end('FAIL');
      }
    },
    closeConnections
  }
}

function toggleStopwatch(clock, ms) {
  return new Promise((res, rej) => {
    clock.start();

    setTimeout(() => {
      clock.stop();
      res();
    }, ms)
  })
}

(async () => {
  const hostname = '127.0.0.1';
  const port = 3000;

  const clock = new Clock({ template: 'hh:mm:ss', precision: interval });

  clock.on('tick', (time) => console.log('SERVER', time)); // логируем серверные часы

  const { requestHandler, closeConnections } = handleTickStream(clock);

  const server = await createServerPromisify(hostname, port, requestHandler);

  const timer = await toggleStopwatch(clock, 60000); // ограничить работу сервера 1 мин

  console.log('Закрываем сервер...');
  closeConnections();
  server.close();
})();