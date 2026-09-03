// отправляет GET запрос на сервер, либо в терминале через утилиту: curl http://127.0.0.1:3000/

const hostname = 'localhost';
const port = 3000;
const base = `http://${hostname}:${port}`;

const requests = [
  { url: base, method: 'GET' },
  { url: `${base}/1234567`, method: 'GET' }, // с параметром
  { url: base, method: 'POST' },
  { url: base, method: 'PUT' },
  { url: base, method: 'PATCH' },
  { url: base, method: 'DELETE' },
];

// Отправляем все запросы параллельно
const promises = requests.map(req =>
  fetch(req.url, { method: req.method })
);

Promise.allSettled(promises)
  .then(responses => Promise.allSettled(responses.map((res, ind) => {
    if (res.status === 'rejected') {
      return `Сетевая ошибка: ${res.reason.message}`;
    }

    if (!res.value.ok) return `Запрос ${ind} не выполнен со статусом: ${res.value.status}`;
    
    return res.value.text();
  })))
  .then(results => {
    results.forEach((res, ind) => {
      console.log(`Ответ запроса ${ind}:`, res.value);
    });
  })
  .catch(err => console.error('Ошибка', err)
  )