// Входные данные:
// массив данных, размер таблиц
// const arrData = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 16];
const arrData = [1, 2, 3, 4, 5, 6, 7, 8, 9];
const size = 3;

const sudokuElem = document.getElementById('sudoku-app');

// функция создает таблицу и добавляет ее в elem
function renderTable(elem, data, size) {
  const table = document.createElement('table');

  table.style.borderCollapse = 'collapse';

  // индексы ячеек
  let ind = 0;

  // создает ряды в таблице 
  for (let i = 0; i < size; i++) {

    const row = table.insertRow();

    // создает ячейки в каждом ряду
    for (let j = 0; j < size; j++) {

      const cell = row.insertCell();

      data.cellIndex = ind;

      // функция вставки содержимого в ячейку
      const value = insertValue(data);

      // условие задает фон пустым ячейкам
      if (value == null && data.state == 'inner') cell.classList.add('mark');

      cell.innerHTML = value;

      ind++;
    }
  }

  elem.append(table);

  return table;
}

// функция вставляет значение в ячейку
function insertValue(data) {

  const { state, arr, cellIndex } = data;

  // если таблица внешняя, ячейки пустые
  if (state == 'outer') return null;

  const num = arr[cellIndex].value;

  return num;
}

// фунция выбирает случайное число из массива arr
function getRandomNum(arr) {
  const numInd = Math.floor(Math.random() * arr.length);

  const roll = arr.splice(numInd, 1);

  return roll[0];
}

// вспомогательная функция-фильтр,
// возращает x, если такое значение отсутствует в массиве array
function notInArray(array) {
  return function (x) {
    const values = array.map(obj => obj.value); // извлечь в массив value
    return !values.includes(x);
  }
}

// функция возвращает новый массив, исключаая совпадения в таблице (sectionX, sectionY, innerTable)
function getArrayProbableValues(arr, sectionX, sectionY, innerTable) {

  const modifiedArrX = arr.filter(notInArray(sectionX));
  const modifiedArrXY = modifiedArrX.filter(notInArray(sectionY));
  const modifiedArr = modifiedArrXY.filter(notInArray(innerTable));

  return modifiedArr;
}

// i-ая таблица чисел (i-ая секция)
// функция возвращает массив чисел i-ой таблицы
function createTableNumbers(arr, sectionX, sectionY, tableId, size) {

  let inProgress = true;

  const innerTable = [];

  // ряды
  outer:
  for (let i = 0; i < size; i++) {

    // ячейки
    for (let j = 0; j < size; j++) {

      const arrayNums = getArrayProbableValues.call(this, arr, sectionX['row' + i], sectionY['column' + j], innerTable);

      const num = getRandomNum.call(this, arrayNums);

      // если подборка неудачная, прекратить выполнение
      if (num == undefined) {

        inProgress = false;
        break outer;
      }

      // значение и адрес ячейки
      let cell = {
        value: num,
        address: {
          // sectionX: sectionX.path,
          // sectionY: sectionY.path,
          axisX: sectionX.path + '.row' + i,
          axisY: sectionY.path + '.column' + j,
          innerTableId: tableId
        }
      };

      innerTable.push(cell);

      sectionX['row' + i].push(cell);
      sectionY['column' + j].push(cell);
    }
  }

  if (!inProgress) return null;

  return innerTable;
}

// создает объект секции заданного размера
function Section(size, keyName) {
  for (let i = 0; i < size; i++) {
    this[keyName + i] = [];
  }
}

function createMapNumbers(arr, size = 3) {
  // индексы внутренних числовых таблиц
  let innerTableId = 0;

  const numbersMap = {
    x: {}, // ряд в mainTable
    y: {}, // столбец в mainTable
    mainTable: {} // массивы внутренних таблиц
  };

  let inProgress = true;

  outer:
  for (let i = 0; i < size; i++) {

    // i-ая секция по Х
    numbersMap.x['sectionX' + i] = new Section(size, 'row');
    numbersMap.x['sectionX' + i].path = 'sectionX' + i;

    for (let j = 0; j < size; j++) {

      // j-ая секция по Y
      if (i == 0) numbersMap.y['sectionY' + j] = new Section(size, 'column');

      numbersMap.y['sectionY' + j].path = 'sectionY' + j;

      // заполняет i-тую таблицу случайными числами
      const tableNumbers = createTableNumbers.call(this, arr, numbersMap.x['sectionX' + i], numbersMap.y['sectionY' + j], innerTableId, size);

      // если комбинация чисел в таблице неудачная,
      // завершить формирование таблиц
      if (tableNumbers == null) {

        inProgress = false;
        break outer;
      }

      numbersMap.mainTable[innerTableId] = tableNumbers;

      innerTableId++;
    }
  }

  if (inProgress == false) return null;

  return numbersMap;
}

function renderTableSudoku(elem, numbersMap, size = 3) {

  // индексы внутренних таблиц
  let ind = 0;

  let tableData = {
    state: 'outer',
    arr: null
  };

  // создает внешнюю таблицу без данных
  const outerTable = renderTable.call(this, elem, tableData, size);
  outerTable.classList.add("mainTable");

  for (let i = 0; i < outerTable.rows.length; i++) {

    for (let j = 0; j < outerTable.rows[i].cells.length; j++) {

      // ячейка внешней таблицы без данных
      const cell = outerTable.rows[i].cells[j];

      tableData = {
        state: 'inner',
        tableId: ind,
        arr: numbersMap.mainTable[ind]
      }

      // создает внутренние таблицы
      const innerTable = renderTable.call(this, cell, tableData, size);
      innerTable.classList.add('inner');

      ind++;
    }
  }
}

function benchmark(func) {

  return function () {
    let param;
    let isFalsy = undefined || '' || false || 0 || null;

    // время выполнения 
    let start = Date.now();

    let k = 0;

    try {

      do {
        k++;

        param = func.apply(this, arguments);

      } while (param === isFalsy && k < 5000);

      if (k == 5000 || param === isFalsy) throw new Error('Превышено количество попыток');

      console.log(k + ' попыток');

    } catch (err) {

      console.log(err);
    }

    let end = Date.now() - start;
    console.log('Время выполнения: ' + end + 'ms');

    return param;
  }
}

console.log('// Решение //');

// функция-обертка для подсчета времени выполнения
createMapNumbers = benchmark(createMapNumbers);

const numbersMap = createMapNumbers(arrData, size);

// отобразить таблицу решения на странице
renderTableSudoku(sudokuElem, numbersMap, size);

// копия созданной числовой карты
const jsonMap = JSON.stringify(numbersMap);
const solutionNumbersMap = JSON.parse(jsonMap);

// Сложность I = 0 (30-35 подсказок), I = 1 (25-30 подсказок), I = 2 (20-25 подсказок)

// Алгоритм:
// 1. Выбрать случайную ячейку n
// 2. Отметить n как просмотренную
// 3. Удалить n
// 4. Посчитать решения, если оно не единственное, то вернуть n обратно

function randomInteger(min, max) {
  let rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
}

// вспомогательная функция, возвращает массив с повторяющимися подмассивами
function getDuplicateArrays(array) {
  return array.filter((item) => {
    if (!Array.isArray(item)) return;

    // сравнить массивы между собой
    for (const subArr of array) {
      if (!Array.isArray(subArr)) continue;

      // исключить сравнение текущего массива с самим собой
      if (item == subArr) continue;

      if (item.length != subArr.length) continue;

      // сравнить не строго (порядок элементов в массиве не учитывается)
      const isDuplicate = item.every((element) => subArr.includes(element));

      // сравнить строго (порядок элементов в массиве учитывается)
      // const isDuplicate = item.every((value, index) => value === subArr[index]);

      if (isDuplicate) return item;
    }
    return;
  });
}

// функция принимает объект и путь к свойству и возвращает его значение
function accessToProp(obj, path) {
  // accumulator = key, currentValue из массива = prop, initialValue = obj
  return path.split('.').reduce((key, prop) => key[prop], obj);
}

// Проверка решения
// функция сравненивает объекты и возвращает true, если они идентичны
function isEqual(obj1, obj2) {
  if (JSON.stringify(obj1) === JSON.stringify(obj2)) return true;
  else return false;
}

// коллекция удаленных значений из числовой карты
let deleteNumbers = new Map();
// коллекция значений, с которыми не найдено решение
let exceptNumbers = new Map();

function createTask(arr, map, difficulty = 1) {

  let n; // количество удаленных ячеек
  switch (difficulty) {
    case 0:
      n = 46;
      break;
    case 1:
      n = 51;
      break;
    case 2:
      n = 56;
      break;
    case 3:
      n = 41;
      break;
  }

  let i = 0;

  while (i < n) {

    // если размер коллекции исключений превышает пороговое значение
    // прекратить поиск пустых ячеек
    if ( (deleteNumbers.size + exceptNumbers.size) == size**4) return true;

    // выбрать случайную ячейку
    let rndTable = randomInteger(0, 8);
    let rndItem = randomInteger(0, 8);

    // создать ключ
    let key = String(rndTable) + String(rndItem);

    // если коллекция deleteNumbers уже содержит комбинацию с таким ключом,
    // прекратить выполнение
    if (deleteNumbers.has(key)) continue;
    if (exceptNumbers.has(key)) continue;

    // случайная ячейка из массива чисел случайной таблицы
    const rndCell = map.mainTable[rndTable][rndItem];

    // добавить ячейку в коллекцию
    deleteNumbers.set(key, rndCell);

    // удалить число в выбранной ячейке и запомнить
    const deletedNumber = rndCell.value;
    rndCell.value = null;

    // попытаться найти решение (заполнить пустые ячейки), и если решение найдено, вернуть map
    const solutionMap = findSolutions(arr, map);

    // проверить верно ли найденное решение
    let result = isEqual(solutionMap, solutionNumbersMap);

    // если решение верно, продолжить
    if (result) {

      i++;
    }
    else {
      // иначе удалить ячейку из коллекции deleteNumbers
      deleteNumbers.delete(key);
      // вернуть значение в ячейку
      rndCell.value = deletedNumber;
      // добавить в коллекцию исключений exceptNumbers
      exceptNumbers.set(key, rndCell);
    }

    // обнулить проверенные решения, перед следующей итерацией поиска решения
    for (const [key, objVal] of deleteNumbers) {

      objVal.value = null;

      deleteNumbers.set(key, objVal);
    }
  }

  return true;
}

function findSolutions(arr, map) {

  // получить массив возможных значений для 1-ой пустой ячейки из карты чисел
  const getProbableValues = (objToCheck) => {
    // пути к массивам с удаленной ячейкой
    const pathX = objToCheck.cell.address.axisX;
    const pathY = objToCheck.cell.address.axisY;

    // массивы (ряд, колонка и таблица) с удаленной ячейкой
    const arrX = accessToProp(map.x, pathX);
    const arrY = accessToProp(map.y, pathY);
    const innerTable = objToCheck.arr;

    // const hasDuplicates = (arr) => {
    //   const arrValues = arr.map(obj => obj.value);

    //   const arrDuplicates = getDuplicateArrays(arrValues);

    //   if (arrDuplicates.length == 0) return;

    //   console.log(arrDuplicates);
    // }

    // hasDuplicates(arrX);
    // hasDuplicates(arrY);

    // массив возможных значений для вставки в пустую ячейку
    const arrProbableNums = getArrayProbableValues.call(this, arr, arrX, arrY, innerTable);

    return arrProbableNums;
  };

  // установить возможные значения для 1-ой пустой ячейки из карты чисел
  const setProbableValues = (args) => {

    const arrValues = getProbableValues.call(this, args);

    if (arrValues.length == 1) return arrValues[0];

    return arrValues;
  };

  try {

    // найти решение
    let result;

    let n = 0;

    // максимальные n и checkArr.calls выбраны как среднестатистические
    do {
      n++;

      result = checkArr.call(this, map.mainTable, setProbableValues);

    } while (result == false && n < 100);

    // если количество попыток превышено, вернуть null
    if (n == 100) return null;

    // если решение найдено, вернуть карту
    if (result == true) return map;

  } catch (err) {

    // поиск решения затянулся (чтобы не превысить максимальный размер стека вызовов)
    console.log(err);
    return null;
  }
}

//функция возврщает true, если массивы состоят из чисел, иначе false
function checkArr(item, func) {

  // прервать выполнение, чтобы не превысить максимальный размер стека вызовов
  if (checkArr.calls > 50000) throw new Error('Не могу найти решение!');

  if (Array.isArray(item)) {

    let isPassed = true;

    for (let i = 0; i < item.length; i++) {

      if (typeof item[i].value != 'number') {

        isPassed = false;

        const objToCheck = ({ arr: item, cell: item[i] });

        // возвращает либо число либо массив
        const probableValue = func.call(this, objToCheck);

        item[i].value = probableValue;
      }
    }
    return isPassed;

  } else {
    let result = true;

    for (let elem of Object.values(item)) {

      if (typeof elem == 'string') continue;

      result = checkArr(elem, func) && result;
    }
    return result;
  }
}

// функция-обертка добавляет счетчик вызовов функции
function counter(func) {
  let count = 0;

  function wrap() {
    wrap.calls = count++;

    return func.apply(this, arguments);
  }
  wrap.calls = count;
  return wrap;
}

// посчитать количество вызовов checkArr
checkArr = counter(checkArr);

console.log('\n// Задача //');

createTask = benchmark(createTask);
createTask(arrData, numbersMap, 3);

console.log(deleteNumbers);
console.log(exceptNumbers);
console.log(numbersMap);
console.log('checkArr', checkArr.calls);

// отобразить на странице задачу
let taskTable = renderTableSudoku(sudokuElem, numbersMap, size);