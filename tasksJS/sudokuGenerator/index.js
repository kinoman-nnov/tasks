// массив данных
const arrNumbers = [1,2,3,4,5,6,7,8,9];

const sudokuElem = document.getElementById('sudoku-app');

let map = new Map();

// функция создает таблицу и добавляет ее в elem
function createTable(elem, data, tr = 3, tc = 3) {
  const table = document.createElement('table');

  table.style.borderCollapse = 'collapse';

  // создает ряды в таблице 
  for (let i = 1; i <= tr; i++) {

    const row = table.insertRow();

    // создает ячейки в каждом ряду
    for (let j = 1; j <= tc; j++) {

      const cell = row.insertCell();

      const { state, tableId } = data;

      // функция вставки содержимого в ячейку
      const value = insertValue(data);

      // инфо о ячейке     
      const cellData = {
        state,
        tableId,
        cellIndex: [row.rowIndex, cell.cellIndex],
        value
      }
      // ключ: объект cellData, значение: value
      map.set(cellData, value);

      cell.innerHTML = value;
    }
  }

  elem.append(table);

  return table;
}

function insertValue(data) {

  const { state, arr, arrExceptions } = data;

  // если таблица внешняя, ячейка пустая
  if (state == 'outer') return null;

  let result = getRandomNum.call(this, arr);

  arrExceptions.push(result);

  console.log(arrExceptions)
  
  return result;
}

function transformArrData(arr, ind, i) {
  
  if (ind == 1) return arr;

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

// получить целое число от min(включительно) до max(не включительно)
// function getRandomNum(min, max) {
//   min = Math.ceil(min);
//   max = Math.floor(max);
//   return Math.floor(Math.random() * (max - min) + min);
// }



// console.log(arrTransform([1,2,3,4,5,6,7,8,9]))

function createTableSudoku(create, elem) {
  
  let ind = 1;

  let tableData = {
    state: 'outer',
    tableId: 'main',
    arr: []
  }

  const table = create.call(this, elem, tableData);
  table.id = "mainTable";
  
  for (let i = 0; i < table.rows.length; i++) {
    
    for (let j = 0; j < table.rows[i].cells.length; j++) {
      const cell = table.rows[i].cells[j];

      tableData = {
        state: 'inner',
        tableId: ind,
        arr: [...arrNumbers],
        arrExceptions: []
      }

      const innerTable = create.call(this, cell, tableData);
      innerTable.classList.add('inner');

      ind++;
    }
  }
}

createTableSudoku(createTable, sudokuElem);

// for (const item of map) {
//   console.log(item)
// }
// console.log(mainTable.rows[0].cells[0].firstElementChild.rows[0].cells[0].cellData)