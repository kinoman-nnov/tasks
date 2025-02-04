// массив данных
const arrData = [1, 2, 3, 4, 5, 6, 7, 8, 9];

const sudokuElem = document.getElementById('sudoku-app');

// функция создает таблицу и добавляет ее в elem
function createTable(elem, data, size) {
  const table = document.createElement('table');

  table.style.borderCollapse = 'collapse';

  // создает ряды в таблице 
  for (let i = 0; i < size; i++) {

    const row = table.insertRow();

    // создает ячейки в каждом ряду
    for (let j = 0; j < size; j++) {

      const cell = row.insertCell();

      const { state, tableId } = data;

      // инфо о ячейке     
      const cellData = {
        state,
        tableId,
        cellIndex: [row.rowIndex, cell.cellIndex]
      }

      // функция вставки содержимого в ячейку
      const value = insertValue(data, cellData);

      cell.innerHTML = value;
    }
  }

  elem.append(table);

  return table;
}

function insertValue(data, cellData) {

  const { state, exceptionsX, exceptionsY, tableId, numbersMap } = data;

  // индекс ряда внутренних таблиц, в котором находится ячейка
  const cellIndRow = cellData.cellIndex[0];
  const cellIndColumn = cellData.cellIndex[1];

  // если таблица внешняя, ячейки пустые
  if (state == 'outer') return null;

  // возвращает новый массив данных, исключая данные
  // уже внесенные в таблицу
  const arrModified = transformArrData.call(this, data, cellData);

  const num = getRandomNum.call(this, arrModified);

  // записываем массивы исключений для каждой строки и столбца внутренних таблиц
  exceptionsX['row' + cellIndRow].push(num);
  exceptionsY['column' + cellIndColumn].push(num);

  // записываем массивы значений внутренних таблиц
  numbersMap.mainTable[tableId].push(num);

  return num;
}

// вспомогательная функция-фильтр, исключающая совпадения в массиве
function inArray(array) {
  return function (x) {
    return !array.includes(x);
  }
}

function transformArrData(data, cellData) {

  const { arr, exceptionsX, exceptionsY, numbersMap, tableId } = data;

  const cellIndRow = cellData.cellIndex[0];
  const cellIndColumn = cellData.cellIndex[1];

  const modifiedArrX = arr.filter(inArray(exceptionsX['row' + cellIndRow]));
  const modifiedArr = modifiedArrX.filter(inArray(exceptionsY['column' + cellIndColumn]));

  // return modifiedArr;
  const modifiedArray = modifiedArr.filter(inArray(numbersMap.mainTable[tableId]));

  return modifiedArray;
}

// фунция выбирает случайное число из массива arr
function getRandomNum(arr) {
  const numInd = Math.floor(Math.random() * arr.length);

  const roll = arr.splice(numInd, 1);

  return roll[0];
}

// function cachingFunc(num) {
//   const cache = new Map();

//   if (cache.has(num)) { // если кеш содержит такой x, заново запустить ГСЧ
//     return cache.get(num);
//   }
// }

function createTableSudoku(create, elem, size = 3) {

  // индексы внутренних таблиц
  let ind = 1;

  const numbersMap = {
    x: {},
    y: {},
    mainTable: {}
  };

  let tableData = {
    state: 'outer',
    tableId: 'main',
    arr: null
  };

  // создает внешнюю таблицу без данных
  const table = create.call(this, elem, tableData, size);
  table.id = "mainTableId";

  const exceptionsY = {};
  const exceptionsX = {};

  for (let i = 0; i < table.rows.length; i++) {

    // формирует карту исключений по оси Х
    for (let k = 0; k < table.rows.length; k++) {
      exceptionsX['row' + k] = [];
    }

    numbersMap.x[i] = { ...exceptionsX };

    for (let j = 0; j < table.rows[i].cells.length; j++) {
      // ячейка внешней таблицы без данных
      const cell = table.rows[i].cells[j];

      // // формирует карту исключений по оси Y
      if (i == 0) {
        for (let k = 0; k < table.rows.length; k++) {
          exceptionsY['column' + k] = [];
        }
        numbersMap.y[j] = { ...exceptionsY };
      }

      numbersMap.mainTable[ind] = [];

      tableData = {
        state: 'inner',
        tableId: ind,
        arr: [...arrData],
        exceptionsX,
        exceptionsY: numbersMap.y[j],
        numbersMap
        // exceptionsX: {
        //   row0: [],
        //   row1: [],
        //   row2: []
        // }
        // exceptionsY: {
        //   column0: [],
        //   column1: [],
        //   column2: []
        // }
      }

      const innerTable = create.call(this, cell, tableData, size);
      innerTable.classList.add('inner');

      ind++;
    }
  }

  return numbersMap;
}

// если хотя бы в одном массиве есть 'undefined',
// возвращает true, иначе false
function checkArr(item) {

  if (Array.isArray(item)) {

    return item.includes(undefined);
  } else {
    let result;
    for (let elem of Object.values(item)) {

      result = result || checkArr(elem);
    }

    return result;
  }
}

let isChecked = false;
let sudokuMap;

let i = 0;
do {i++
  sudokuMap = createTableSudoku(createTable, sudokuElem);
  
  isChecked = checkArr(sudokuMap.mainTable);

  if (isChecked) mainTableId.remove();
} while (isChecked);
console.log(i + ' попыток');