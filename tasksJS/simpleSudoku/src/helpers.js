// функция-повторитель для поиска решения
// n - максимальное количество итераций поиска
function repeater(func, n = 100) {

  return function () {
    let result;

    let k = 0;

    try {

      do {
        k++;

        result = func.apply(this, arguments);
        
      } while ((result === undefined || result === '' || result === false || result === 0 || result === null) && (k < n));

      if (k == n) return result || null;

    } catch (err) {

      // console.log(err);
      // return null;
      throw err;
    }

    return result;
  }
}

// функция возврщает true, если массивы состоят из чисел, иначе false
function scannerArr(item, func, flag) {

  // прервать выполнение, чтобы не превысить максимальный размер стека вызовов
  if (scannerArr.calls > 20000) throw new Error('Превышено количество вызовов scanner!');

  if (Array.isArray(item)) {

    // операция над массивом
    // возращает булевое значение
    const isPassed = func.call(this, item, flag);

    return isPassed;

  } else {

    let result = true;

    for (let elem of Object.values(item)) {

      if (typeof elem == 'string') continue;
      
      arguments[0] = elem;

      result = scannerArr.apply(this, arguments) && result;
    }

    return result;
  }
}

// посчитать количество вызовов scannerArr
scannerArr = counter(scannerArr);

// функция подсчета затраченного времени
function runTime(func) {

  return function () {
    let start = Date.now();

    const result = func.apply(this, arguments);

    let end = Date.now() - start;

    // console.log('Время выполнения: ' + end + 'ms');
    result.time = end;

    return result;
  }
}

// создает объект заданного размера
function createObj(size, keyName) {
  for (let i = 0; i < size; i++) {
    this[keyName + i] = [];
  }
}

// вспомогательная функция-фильтр,
// возращает x, если такое значение отсутствует в массиве array
function notInArray(array) {
  return function (x) {
    return !array.includes(x);
  }
}

function adaptedNotInArray(origin) {
  return function (arg) {

    const values = arg.map(obj => obj.value); // извлечь в массив value
    return origin.call(this, values);
  }
}

// ф-ция notInArray, адаптированная под массив объектов
adaptedNotInArray = adaptedNotInArray(notInArray);

// функция возвращает новый массив, исключаая совпадения в ряду, колонке, таблице (arrX, arrY, table)
function exceptionArr(dataArr, arrX, arrY, matrix) {
  const exceptArrX = dataArr.filter(adaptedNotInArray(arrX));
  const exceptArrXY = exceptArrX.filter(adaptedNotInArray(arrY));
  const exceptXYMatrix = exceptArrXY.filter(adaptedNotInArray(matrix));
  return exceptXYMatrix;
}

// случайное целое, включая min и max
function randomInteger(min, max) {
  let rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
}

// фунция выбирает случайное число из массива arr, уменьшая его длину
function getRandomNum(arr) {
  const numInd = Math.floor(Math.random() * arr.length);

  const roll = arr.splice(numInd, 1);

  return roll[0];
}

// функция принимает объект и путь к свойству в виде строки и возвращает его значение
function accessToProp(obj, path) {
  // accumulator = key, currentValue из массива = prop, initialValue = obj
  return path.split('.').reduce((key, prop) => key[prop], obj);
}

// вспомогательная функция-фильтр,
// возращает x, если такое значение присутствует в массиве array
function inArray(array) {
  return function (x) {
    return array.includes(x);
  };
}

function groupBy(arr, key) {
  return arr.reduce(function (acc, i) {
    (acc[accessToProp(i, key)] ??= []).push(i);
    return acc;
  }, {});
}

function sortByArrLength (arr) {
  return arr.reduce(function (acc, i) {
    (acc[i.value.length] ??= []).push(i);
    if (i.value.length > acc.maxLength) acc.maxLength = i.value.length;
    return acc;
  }, { maxLength: 0 });
}

function hasNoNull(complexArr) {
  const hasNoNull = complexArr.every(elem => elem.value !== null);
  return hasNoNull;
}

// функция сравненивает объекты и возвращает true, если они идентичны
function isEqual(obj1, obj2) {
  if (JSON.stringify(obj1) === JSON.stringify(obj2)) return true;
  else return false;
}

// функция-обертка добавляет счетчик вызовов функции
function counter(func) {
  let count = 0;

  function wrap() {
    wrap.calls = ++count;

    return func.apply(this, arguments);
  }
  wrap.calls = count;
  return wrap;
}

export {
  createObj,
  isEqual,
  notInArray,
  adaptedNotInArray,
  exceptionArr,
  scannerArr,
  inArray,
  groupBy,
  sortByArrLength,
  randomInteger,
  getRandomNum,
  accessToProp,
  hasNoNull,
  runTime,
  repeater,
  counter
}