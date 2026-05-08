// мой вариант
// (Итоговое время выполнения: 4976ms)

// function shuffle(arr) {
//   let arrData = [...arr];
//   let newArr = [];

//   while (arrData.length > 0) {
//     let rndNum = getRandonNum(arrData);
//     newArr.push(rndNum);
//   }
//   return newArr;
// }

// function getRandonNum(arr) {
//   const numInd = Math.floor(Math.random() * arr.length);
//   const roll = arr.splice(numInd, 1);
//   return roll[0];
// }

// алгоритм тасования Фишера — Йетса
// (Итоговое время выполнения: 2836ms)
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1)); // случайный индекс от 0 до i

    // поменять элементы местами
    // let t = array[i]; array[i] = array[j]; array[j] = t
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// подсчёт вероятности для всех возможных вариантов
let count = {
  '123': 0,
  '132': 0,
  '213': 0,
  '231': 0,
  '321': 0,
  '312': 0
};

function counterLikelihood(func) {

  return function () {

    for (let i = 0; i < 1000000; i++) {
      let array = [1, 2, 3];

      count[func.call(this, array).join('')]++;
    }
  }
}

// время выполнения 
function bench(f) {
  let start = Date.now();

  f.apply(this, arguments);

  return Date.now() - start;
}

let time = 0;

let counter = counterLikelihood(shuffle);

// добавляем для "разогрева" перед основным циклом
bench(counter);

// bench() запускается 10 раз
for (let i = 0; i < 10; i++) {

  time += bench(counter);
}

// показать количество всех возможных вариантов
for (let key in count) {
  console.log(`${key}: ${count[key]}`);
}

console.log('Итоговое время выполнения: ' + time + 'ms');