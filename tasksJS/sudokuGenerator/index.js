// массив данных
const arrNumbers = [1,2,3,4,5,6,7,8,9];

const sudokuElem = document.getElementById('sudoku-app');

// let map = new Map();

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

      // // ключ: объект cellData, значение: value
      // map.set(cellData, value);

      cell.innerHTML = value;
    }
  }

  elem.append(table);

  return table;
}

function insertValue(data, cellData) {
  
  const { state, exceptions } = data;

  // индекс ряда внутренних таблиц, в котором находится ячейка
  const cellIndRow = cellData.cellIndex[0];

  // если таблица внешняя, ячейки пустые
  if (state == 'outer') return null;

  const arrModified = transformArrData.call(this, data, cellIndRow);

  const num = getRandomNum.call(this, arrModified);

  // массивы исключений для каждой строки внутренних таблиц
  exceptions['row' + cellIndRow].push(num);

  return num;
}

// вспомогательная функция-фильтр, исключающая совпадения в массиве
function inArray(array) {
  return function(x) {
    return !array.includes(x);
  }
}

function transformArrData(data, cellIndRow) {

  const { arr, exceptions } = data;

  // возвращает новый массив данных, исключая данные
  // уже внесенные в таблицу
  const modifiedArr = arr.filter(inArray(exceptions['row' + cellIndRow]));

  return modifiedArr;
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

  const exceptionsMap = {};

  let tableData = {
    state: 'outer',
    tableId: 'main',
    arr: null
  }

  // создает внешнюю таблицу без данных
  const table = create.call(this, elem, tableData, size);
  table.id = "mainTable";
  
  for (let i = 0; i < table.rows.length; i++) {

    // формирует карту исключений
    const exceptions = {};
    for(let i = 0; i < table.rows.length; i++) {
      exceptions['row' + i] = [];
    }
    exceptionsMap[i] = exceptions;

    for (let j = 0; j < table.rows[i].cells.length; j++) {
      // ячейка внешней таблицы без данных
      const cell = table.rows[i].cells[j];

      tableData = {
        state: 'inner',
        tableId: ind,
        arr: [...arrNumbers],
        exceptions
        // exceptions: {
        //   row0: [],
        //   row1: [],
        //   row2: []
        // }
      }
      
      const innerTable = create.call(this, cell, tableData, size);
      innerTable.classList.add('inner');

      ind++;
    }
  }
}

createTableSudoku(createTable, sudokuElem);