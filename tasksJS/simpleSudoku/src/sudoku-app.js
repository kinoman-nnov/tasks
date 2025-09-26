import inputData from './inputData.json' with { type: 'json' };
import { runTime } from './helpers.js';

import { createMapNumbers, createMapNumbersCounter } from './createMapNumbers.js';
import { createTask, deleteNumbers, scanerArr} from './createTask.js';

// Входные данные:
// массив данных, размер таблиц
// const arrData = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 16];
// const size = 4;

// const arrData = [1, 2, 3, 4, 5, 6, 7, 8, 9];
// const size = 3;

// const arrData = [1, 2, 3, 4];
// const size = 2;

const { arrData, size, difficulty } = inputData;

const sudokuElem = document.getElementById('sudoku-app');

// функция создает таблицу и добавляет ее в elem
function renderTable(elem, data, size = 3) {
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

console.log('// Решение //');

// посчитать время выполнения, затраченное на поиск числовой карты
const createMapNumbersEvaluation = runTime(createMapNumbers);
const numbersMap = createMapNumbersEvaluation(arrData, size);

// количество попыток затраченное на подбор решения repeater-ом
console.log('попыток: ' + createMapNumbersCounter.calls);

if (!!numbersMap) {

  console.log('\n// Задача //');

  // посчитать время выполнения, затраченное на поиск задачи
  const createTaskEvaluation = runTime(createTask);
  const task = createTaskEvaluation(arrData, numbersMap, difficulty);

  console.log('Количество пустых ячеек: ' + deleteNumbers.size);
  console.log('попыток: ' + scanerArr.calls);

  // отобразить на странице задачу
  renderTableSudoku(sudokuElem, numbersMap, size);
  
} else {
  const text = document.createElement('h1');
  text.innerHTML = "Try again!";
  sudokuElem.appendChild(text);
}