import {
  createObj as section,
  exceptionArr as getArrayProbableValues,
  repeater,
  getRandomNum,
  counter
} from './helpers.js';

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

      const arrayNums = getArrayProbableValues(arr, sectionX['row' + i], sectionY['column' + j], innerTable);

      const num = getRandomNum(arrayNums);

      // если подборка неудачная, прекратить выполнение
      if (num === undefined) {

        inProgress = false;
        break outer;
      }

      // значение и адрес ячейки
      let cell = {
        value: num,
        originValue: num,
        address: {
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

  if (inProgress === false) return null;

  return innerTable;
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
    numbersMap.x['sectionX' + i] = section(size, 'row'); // создает объект секции заданного размера
    numbersMap.x['sectionX' + i].path = 'sectionX' + i;

    for (let j = 0; j < size; j++) {

      // j-ая секция по Y
      if (i == 0) numbersMap.y['sectionY' + j] = section(size, 'column');

      numbersMap.y['sectionY' + j].path = 'sectionY' + j;

      // заполняет i-тую таблицу случайными числами
      const tableNumbers = createTableNumbers(arr, numbersMap.x['sectionX' + i], numbersMap.y['sectionY' + j], innerTableId, size);

      // если комбинация чисел в таблице неудачная,
      // завершить формирование таблиц
      if (tableNumbers === null) {

        inProgress = false;
        break outer;
      }

      numbersMap.mainTable[innerTableId] = tableNumbers;

      innerTableId++;
    }
  }

  if (inProgress === false) return null;

  return numbersMap;
}

// функция-обертка - счетчик вызовов функции
createMapNumbers = counter(createMapNumbers);
const createMapNumbersCounter = createMapNumbers;

// функция-обертка - поисковик решения
createMapNumbers = repeater(createMapNumbers, 5000);

export { createMapNumbers, createMapNumbersCounter };