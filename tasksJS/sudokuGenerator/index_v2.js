// Входные данные:
// массив данных, размер таблиц
// const arrData = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 16];
const arrData = [1, 2, 3, 4, 5, 6, 7, 8, 9];
const size = 3;

const sudokuElem = document.getElementById('sudoku-app');

// функция создает таблицу и добавляет ее в elem
function createTable(elem, data, size) {
  const table = document.createElement('table');

  table.style.borderCollapse = 'collapse';

  // индексы ячеек
  let ind = 1;

  // создает ряды в таблице 
  for (let i = 0; i < size; i++) {

    const row = table.insertRow();

    // создает ячейки в каждом ряду
    for (let j = 0; j < size; j++) {

      const cell = row.insertCell();

      data.cellIndex = ind;

      // функция вставки содержимого в ячейку
      const value = insertValue(data);

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

  const num = arr[cellIndex - 1]

  return num;
}

// фунция выбирает случайное число из массива arr
function getRandomNum(arr) {
  const numInd = Math.floor(Math.random() * arr.length);

  const roll = arr.splice(numInd, 1);

  return roll[0];
}

// вспомогательная функция-фильтр, исключающая совпадения в массиве
function inArray(array) {
  return function (x) {
    return !array.includes(x);
  }
}

// функция преобразовывает входной массив, исключаая совпадения в таблице
function transformArrData(arr, sectionX, sectionY, innerTable) {

  const modifiedArrX = arr.filter(inArray(sectionX));
  const modifiedArrXY = modifiedArrX.filter(inArray(sectionY));
  const modifiedArr = modifiedArrXY.filter(inArray(innerTable));

  return modifiedArr;
}

// i-ая таблица чисел (i-ая секция)
// функция возвращает массив чисел i-ой таблицы
function createTableNumbers(arr, sectionX, sectionY, size) {

  let inProgress = true;

  const innerTable = [];

  // ряды
  outer:
  for (let i = 0; i < size; i++) {

    // ячейки
    for (let j = 0; j < size; j++) {

      const arrayNums = transformArrData.call(this, arr, sectionX['row' + i], sectionY['column' + j], innerTable);

      const num = getRandomNum.call(this, arrayNums);

      // если подборка неудачная, прекратить выполнение
      if (num == undefined) {

        inProgress = false;
        break outer;
      }

      innerTable.push(num);

      sectionX['row' + i].push(num);
      sectionY['column' + j].push(num);
    }
  }

  if (!inProgress) return null;

  return innerTable;
}

// создает объект секции заданного размера
function SectionObj(size, keyName) {
  for (let i = 0; i < size; i++) {
    this[keyName + i] = [];
  }
}

function createMapNumbers(arr, size = 3) {
  // индексы внутренних числовых таблиц
  let sectionId = 1;

  const numbersMap = {
    x: {}, // ряд в mainTable
    y: {}, // столбец в mainTable
    mainTable: {} // массивы внутренних таблиц
  };

  let inProgress = true;

  outer:
  for (let i = 0; i < size; i++) {

    // i-ая секция по Х
    numbersMap.x['sectionX' + i] = new SectionObj(size, 'row');

    for (let j = 0; j < size; j++) {

      // j-ая секция по Y
      if (i == 0) numbersMap.y['sectionY' + j] = new SectionObj(size, 'column');

      // заполняет i-тую таблицу случайными числами
      const tableNumbers = createTableNumbers.call(this, arr, numbersMap.x['sectionX' + i], numbersMap.y['sectionY' + j], size);

      // если комбиная чисел в таблице неудачная,
      // завершить формирование таблиц
      if (tableNumbers == null) {

        inProgress = false;
        break outer;
      }

      numbersMap.mainTable[sectionId] = tableNumbers;

      sectionId++;
    }
  }

  if (inProgress == false) return null;

  return numbersMap;
}

function createTableSudoku(elem, numbersMap, size = 3) {

  // индексы внутренних таблиц
  let ind = 1;

  let tableData = {
    state: 'outer',
    arr: null
  };

  // создает внешнюю таблицу без данных
  const outerTable = createTable.call(this, elem, tableData, size);
  outerTable.id = "mainTableId";

  for (let i = 0; i < outerTable.rows.length; i++) {

    for (let j = 0; j < outerTable.rows[i].cells.length; j++) {

      // ячейка внешней таблицы без данных
      const cell = outerTable.rows[i].cells[j];

      tableData = {
        state: 'inner',
        tableId: ind,
        arr: numbersMap.mainTable[ind]
      }

      const innerTable = createTable.call(this, cell, tableData, size);
      innerTable.classList.add('inner');

      ind++;
    }
  }
}

let numbersMap;

// время выполнения 
let start = Date.now();

let k = 0;

try {

  do {
    k++;

    numbersMap = createMapNumbers(arrData, size);

  } while (numbersMap == null && k < 10000);

  if (k == 10000 || numbersMap == null) throw new Error('Превышено количество попыток');

  console.log(k + ' попыток');

  createTableSudoku(sudokuElem, numbersMap, size);

} catch (err) {

  console.log(err);
}

let end = Date.now() - start;
console.log('Время выполнения: ' + end + 'ms');