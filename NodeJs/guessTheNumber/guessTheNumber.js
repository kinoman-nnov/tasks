// приложение – «Угадай число», где необходимо будет угадать задуманное программой
// число от 1 до 10 и программа в конце выведет, за сколько шагов это было
// сделано.

// Если число угадано, то мы выводим поздравление и количество попыток,
// затраченное на игру, потом с помощью функции log пытаемся сохранить
// результат в файле, если это возможно

// необходимо установить модуль minimist, чтобы обрабатывать
// всевозможные комбинации параметров и их форматы 

// Например: node guessTheNumber.js log.txt

let readline = require('readline'),
  argv = require('minimist')(process.argv.slice(2)),
  fs = require('fs'),
  mind, count, rl, logfile;

function init() {
  // получим случайное число от 1 до 10
  mind = Math.floor(Math.random() * 10) + 1;
  // обнулим счетчик количества угадываний
  count = 0;
  // установим ввод и вывод в стандартные потоки
  rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  // запомним имя файла для логов, если он есть

  logfile = argv['_'][0];
}

function game() {
  function log(data) {
    if (logfile != undefined) {
      console.log('data', data)
      fs.appendFile(logfile, data + "\n", (err) => {
        if (err) {
          console.log("Error", err);
        }
      });
    }
  }
  function valid(value) {
    if (isNaN(value)) {
      console.log('Введите число!');
      return false;
    }
    if (value < 1 || value > 10) {
      console.log('Число должно лежать в заданном диапазоне!');
      return false;
    }
    return true;
  }
  rl.question('Введите любое число от 1 до 10, чтобы угадать задуманное: ',
    function (value) {
      let a = +value;
      if (!valid(a)) {
        // если валидацию не прошли - запускаем игру заново
        game();
      } else {
        count += 1;
        if (a === mind) {
          console.log('Поздравляем! Вы угадали число за шага(ов)', count);
          log('Поздравляем! Вы угадали число за ' + count + ' шага(ов)');
          // угадали и закрыли экземпляр Interface, конец программы
          rl.close();
        } else {
          console.log('Вы не угадали, еще попытка');
          game();
        }
      }
    }
  );
}
init();
game();