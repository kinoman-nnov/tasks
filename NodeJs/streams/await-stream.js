// вариант 1
// const fs = require('fs');

// const delay = time => {
//   return new Promise((resolve) => setTimeout(resolve, time));
// };

// const readStream = stream => {
//   const buffer = []; // Буфер для накопления чанков
//   let isEnded = false; // Флаг завершения потока
//   let pendingResolve = null; // ссылка на resolve текущего промиса
//   let isCleaned = false; // Флаг очистки

//   // удаление всех обработчиков и очистка состояния
//   const cleanup = () => {
//     if (isCleaned) return;
//     isCleaned = true;

//     stream.removeListener('data', onData);
//     stream.removeListener('error', onError);
//     stream.removeListener('end', onEnd);

//     // очищаем буфер и сбрасываем ссылки
//     buffer.length = 0;
//     pendingResolve = null;
//   };

//   const onData = data => {
    
//     console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>__DATA');
    
//     if (pendingResolve) {
//       // Если есть ожидающий промис — сразу его разрешаем
//       pendingResolve.resolve(data);
//       pendingResolve = null;
//     } else {
//       // Иначе сохраняем в буфер
//       buffer.push(data);
//     }
//   };

//   const onError = err => {
//     cleanup();
    
//     console.log('----------------------------------__ERROR');

//     if (pendingResolve) {
//       pendingResolve.reject(err); // Передаём ошибку
//       pendingResolve = null;
//     }
//   };

//   const onEnd = () => {
//     isEnded = true;
    
//     console.log('=================================__END');

//     if (pendingResolve) {
//       pendingResolve.resolve(null); // Завершаем с null при окончании
//       pendingResolve = null;
//     }
//   };

//   stream.on('data', onData);
//   stream.on('error', onError);
//   stream.on('end', onEnd);

//   return function() {
//     return new Promise((resolve, reject) => {
//       if (buffer.length > 0) {
//         // Если в буфере есть данные — отдаём первый чанк
//         resolve(buffer.shift());
//       } else if (isEnded) {
//         // Если поток завершён — возвращаем null
//         resolve(null);
//         cleanup();
//       } else {
//         // Иначе ждём следующего чанка
//         pendingResolve = { resolve, reject };
//       }
//     });
//   };
// };

// async function read() {
//   let stream = fs.createReadStream('./writeStream/ws-doc/ws.js', {
//     highWaterMark: 80,
//     encoding: 'utf8',
//   });

//   let reader = readStream(stream);
//   let data = await reader();

//   try {
//     while (data !== null) {
  
//       console.log(data);
  
//       await delay(500);
//       data = await reader();
//     }
//     console.log('Чтение завершено!');
//   } catch(err) {
//     console.error('Ошибка при чтении:', err);
//   }
// }

// read();

// process.on('unhandledRejection', (reason, p) => {
//   console.log('Unhandled Rejection at:', p, 'reason:', reason);
// });


// вариант 2 (без ручного управления буфером)
const fs = require('fs');

const delay = time => {
  return new Promise((resolve) => setTimeout(resolve, time));
};

async function read() {
  let stream = fs.createReadStream('./writeStream/ws-doc/ws.js', {
    highWaterMark: 80,
    encoding: 'utf8',
  });

  try {
    for await (const chunk of stream) {
      console.log(chunk);
      await delay(500);
    }
    console.log('Чтение завершено!');
  } catch (error) {
    console.error('Ошибка при чтении потока:', error);
  } finally {
    stream.destroy(); // закрытие потока
  }
}

read();

process.on('unhandledRejection', (reason, p) => {
  console.log('Unhandled Rejection at:', p, 'reason:', reason);
});


// вариант LS
// const fs = require('fs');
 
// const delay = time => {
//   return new Promise((resolve, reject) => setTimeout(resolve, time));
// };
 
// const readStream = stream => {
//   return function() {
//     return new Promise((resolve, reject) => {
//       stream.on('data', ondata);
//       stream.on('error', onerror);
//       stream.on('end', onend);
//       stream.resume();
 
//       function ondata(chunk) {
//         console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>__DATA');
//         stream.pause();
//         clearListener();
//         resolve(chunk);
//       }

//       function onerror(err) {
//         console.log('----------------------------------__ERROR');
//         clearListener();
//         reject(err);
//       }

//       function onend() {
//         console.log('=================================__END');
//         clearListener();
//         resolve();
//       }

//       function clearListener() {
//         stream.removeListener('data', ondata);
//         stream.removeListener('error', onerror);
//         stream.removeListener('end', onend);
//       }
//     });
//   };
// };
 
// async function read() {
//   let stream = fs.createReadStream('./writeStream/ws-doc/ws.js', {
//     highWaterMark: 80,
//     encoding: 'utf8',
//  });

//  let reader = readStream(stream);
//  let data = await reader();

//  while (data) {
//    await delay(500);

//    console.log(data);

//    data = await reader();
//  }
// }
 
// read();
 
// process.on('unhandledRejection', (reason, p) => {
//  console.log('Unhandled Rejection at:', p, 'reason:', reason);
// });