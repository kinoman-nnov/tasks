// отправляет GET запрос на сервер, либо в терминале через утилиту: curl http://127.0.0.1:3000/
(async () => {
  const hostname = '127.0.0.1';
  const port = 3000;

  try {
    let response = await fetch(`http://${hostname}:${port}`);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    // обработать данные как поток
    const reader = response.body.getReader();
    const decoder = new TextDecoder();

    while (true) {
      const { value, done } = await reader.read();

      if (done) break;

      const chunk = decoder.decode(value, { stream: true });

      console.log(chunk);
    }
  } catch (err) {
    console.log(err);
  }
})();