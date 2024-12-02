const fs = require("fs");

const file = fs.createWriteStream("file-stream.txt");

function writeOneMillionTimes(writer, data, encoding, callback) {
  let i = 999999;
  write();
  function write() {
    let ok = true;
    do {
      i--;
      if (i === 0) {
        // Последний чанк данных передан в целевой ресурс,
        // метод end() завершает передачу данных,
        // выполнить коллбэк-функцию 
        writer.end(data, encoding, callback);
      } else {
        // Смотрим, следует ли нам продолжать.
        // Метод write() возвращает false, если размер внутреннего буфера
        // превысит ограничение HighWatermark, заданное при инициализации потока
        ok = writer.write(data, encoding);
      }
    } while (i > 0 && ok);
    if (i > 0) {
      // Когда буфер освобождается, возникает событие drain,
      // извещающее о том, что запись в поток можно продолжить
      console.log("drain: " + i);
      // добавить однократный обработчик события drain и снова продолжить запись
      writer.once("drain", write);
    }
  }
}

writeOneMillionTimes(file, "test ", "utf-8", () => {
  console.log("callback");
});