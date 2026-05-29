(async () => {
  const hostname = '127.0.0.1';
  const port = 3000;

  try {
    let response = await fetch(`http://${hostname}:${port}`);

    if (response.ok) { // если HTTP-статус в диапазоне 200-299
      let text = await response.text();

      console.log(text);
    }
  } catch (err) {
    console.log(err);
  }
})();