// import { inputData } from './inputData.js';
import { runTime } from './helpers.js';

import { createMapNumbers, createMapNumbersCounter } from './createMapNumbers.js';
import { createTask, deleteNumbers, scannerArr } from './createTask.js';

import { mapNumbersTest } from '../tests/inputData/solutionMap.test.js';

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

      let currentValue;

      switch (data.state) {
        case 'outer':

          cell.innerHTML = null;
          break;

        case 'inner':
          currentValue = data.arr[ind].value;

          if (currentValue == null) {
            cell.classList.add('cell-isEmpty');

            // добавить input в ячейку
            insertInputLayout(cell);
          }
          else cell.innerHTML = currentValue;
          break;
      }

      ind++;
    }
  }

  elem.append(table);

  return table;
}

function insertInputLayout(element) {
  const inputEl = document.createElement('input');

  inputEl.classList.add('cell-input');

  inputEl.name = 'inputNumber';
  inputEl.type = 'text';
  // inputEl.maxLength = 1;
  inputEl.inputMode = "numeric";
  inputEl.autocomplete = "off";

  element.appendChild(inputEl);
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

export default function sudokuApp(config, sudokuElem) {

  // сбросить предыдущую разметку, счетчик и логи
  sudokuElem.innerHTML = '';
  console.clear();
  // let timerId;

  const { arrData, size, difficulty } = config;

  try {
    console.log('// Решение //');

    // посчитать время выполнения, затраченное на поиск числовой карты
    const createMapNumbersEvaluation = runTime(createMapNumbers);
    const numbersMap = createMapNumbersEvaluation(arrData, size);

    if (!numbersMap) throw new Error("Числовая карта не найдена");

    // количество попыток затраченное на подбор решения repeater-ом
    console.log('попыток: ' + createMapNumbersCounter.calls);
    console.log('время выполнения: ' + numbersMap.time, 'ms');

    // const numbersMap = mapNumbersTest;

    console.log('\n// Задача //');

    // посчитать время выполнения, затраченное на поиск задачи
    const createTaskEvaluation = runTime(createTask);
    const task = createTaskEvaluation(arrData, numbersMap, difficulty);

    console.log('Количество пустых ячеек: ' + deleteNumbers.size);
    console.log('вызовов scanerArr: ' + scannerArr.calls);
    console.log('время выполнения: ' + task.time, 'ms');

    // отобразить на странице задачу
    renderTableSudoku(sudokuElem, numbersMap, size);

    // stress-test
    // циклическая перезагрузка страницы
    // timerId = setTimeout(function run() {
    //   location.reload();
    //   timerId = setTimeout(run, 0);
    // }, 0);

    return task;

  } catch (err) {

    const text = document.createElement('h1');
    text.innerHTML = err.message;

    // if (!!err.message) {
    //   clearTimeout(timerId);
    // }

    console.log(err);

    sudokuElem.appendChild(text);
  }
}