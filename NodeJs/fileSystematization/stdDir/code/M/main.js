const fs = require('fs');

const delay = time => {
  return new Promise((resolve) => setTimeout(resolve, time));
};

const readStream = stream => {
  const buffer = []; // Буфер для накопления чанков
  let isEnded = false; // Флаг завершения потока
  let pendingResolve = null; // ссылка на resolve текущего промиса

  stream.on('data', data => {
    if (pendingResolve) {
      // Если есть ожидающий промис — сразу его разрешаем
      pendingResolve(data);
      pendingResolve = null;
    } else {
      // Иначе сохраняем в буфер
      buffer.push(data);
    }
  });

  stream.on('error', err => {
    if (pendingResolve) {
      pendingResolve(null, err); // Передаём ошибку
      pendingResolve = null;
    }
  });

  stream.on('end', () => {
    isEnded = true;
    if (pendingResolve) {
      pendingResolve(null); // Завершаем с null при окончании
      pendingResolve = null;
    }
  });

  return function() {
    return new Promise((resolve, reject) => {
      if (buffer.length > 0) {
        // Если в буфере есть данные — отдаём первый чанк
        resolve(buffer.shift());
      } else if (isEnded) {
        // Если поток завершён — возвращаем null
        resolve(null);
      } else {
        // Иначе ждём следующего чанка
        pendingResolve = resolve;
      }
    });
  };
};

async function read() {
  let stream = fs.createReadStream('./writeStream/ws-doc/ws.js', {
    highWaterMark: 80,
    encoding: 'utf8',
  });

  let reader = readStream(stream);
  let data = await reader();

  while (data !== null) {

    console.log(data);

    await delay(500);
    data = await reader();
  }
}

read();

process.on('unhandledRejection', (reason, p) => {
  console.log('Unhandled Rejection at:', p, 'reason:', reason);
});