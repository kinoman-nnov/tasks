// счетчик количества строк в файлах
// имена файлов передаются в виде аргументов командной строки
// например: node lineCounter.js test.txt test.json

const fs = require('fs');

const filenames = process.argv.slice(2);

let counts = filenames.map(f => {
  try {
    const data = fs.readFileSync(f, { encoding: 'utf8' });
    return `${f}: ${data.split('\n').length}`;
  } catch (err) {
    return `${f}: ошибка при чтении файла`;
  }
});

counts.forEach(item => {
  console.log(item);
});