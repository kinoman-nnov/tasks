import { inputData } from './inputData.js';
import {
  exceptionArr as getArrayProbableValues,
  scannerArr,
  repeater,
  randomInteger,
  getRandomNum,
  accessToProp,
  counter
} from './helpers.js';
import { analyzeCandidates } from './analyzer.js';

const { arrCells } = inputData;

// Сложность I = 0 (30-35 подсказок), I = 1 (25-30 подсказок), I = 2 (20-25 подсказок)

// Алгоритм:
// 1. Выбрать случайную ячейку n
// 2. Отметить n как просмотренную
// 3. Удалить n
// 4. Посчитать решения, если оно не единственное, вернуть n обратно

// коллекция удаленных значений из числовой карты
let deleteNumbers = new Map();
// коллекция значений, с которыми не найдено решение
let exceptNumbers = new Map();

function createTask(arr, map, difficulty = 1) {

  // копия созданной числовой карты решения задачи
  const originMap = JSON.stringify(map.mainTable);

  let n; // количество удаленных ячеек

  switch (difficulty) {
    case 0:
      n = 46;
      break;
    case 1:
      n = 56;
      break;
    case 2:
      n = 61;
      break;
  }

  let i = 0;
  let iterationNum = 0;

  try {

    while (i < n) {

      iterationNum++;

      // прервать выполнение, чтобы не превысить максимальный размер стека вызовов
      if (iterationNum > 10000) throw new Error('Не могу найти решение!');

      // условие выхода из цикла (Вариант_1)
      // если размер коллекции исключений превышает пороговое значение
      // прекратить поиск пустых ячеек
      // if ((deleteNumbers.size + exceptNumbers.size) == arrCells.length) break;

      // условие выхода из цикла (Вариант_2)
      if (arrCells.length == 0) break;

      // сгенерировать случайное число из последовательности (вариант_1)
      // (без удаление числа из последовательности) не сокращая массив вариантов
      // let rndTable = randomInteger(0, arr.length - 1);
      // let rndItem = randomInteger(0, arr.length - 1);

      // сгенерировать случайное число из последовательности (вариант_2)
      // сокращая массив вариантов (меньше итераций createTask)
      let rndNumOfSequence = getRandomNum(arrCells);
      // первая цифра определяет таблицу, вторая - ячейку
      let rndTable = rndNumOfSequence.split('')[0];
      let rndItem = rndNumOfSequence.split('')[1];

      // создать ключ
      let key = String(rndTable) + String(rndItem);

      // если коллекции deleteNumbers и exceptNumbers уже содержат комбинацию с таким ключом,
      // прекратить выполнение
      if (deleteNumbers.has(key)) continue;
      if (exceptNumbers.has(key)) continue;

      // случайная ячейка из числовой карты
      const rndCell = map.mainTable[rndTable][rndItem];

      // добавить ячейку в коллекцию
      deleteNumbers.set(key, rndCell);

      // удалить число в выбранной ячейке и запомнить
      const deletedNumber = rndCell.value;
      rndCell.value = null;

      // ряд, колонка и таблица неопределенной ячейки (arrX, arrY, innerTable)
      // возвращает функцию
      const coordsEmptyCell = getCoordsEmptyCell(map);

      // посчитать возможные значения (массив или число) для неопределнной ячейки
      // возвращает функцию
      const candidatesToCell = getCandidates(arr, map, coordsEmptyCell);

      // добавить обработчик
      // проверить массив, если есть пустоты - заполнить
      // возвращает функцию
      const handler = checkArr(candidatesToCell);

      // попытаться найти решение (заполнить пустые ячейки массивами возможных кандидатов),
      // если решение найдено, вернуть map
      const currentMap = findSolutions(map, handler);

      const currentMapJSON = JSON.stringify(currentMap.mainTable);

      // проверить верно ли найденное решение
      // если решение верно, продолжить
      if (currentMapJSON === originMap) {
        i++;
      }
      else {
        // иначе удалить ячейку из коллекции deleteNumbers
        deleteNumbers.delete(key);
        // вернуть значение в ячейку таблицы
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

  } catch (err) {
    // console.log("%c" + err, "color:red");
    throw err;
  }

  return map;
}

// функция возвращает координаты (ряд, колонка и таблица) удаленной ячейки
function getCoordsEmptyCell(map) {

  return function (objToCheck) {
    // пути к массивам с удаленной ячейкой
    const pathX = objToCheck.cell.address.axisX;
    const pathY = objToCheck.cell.address.axisY;

    // массивы (ряд, колонка и таблица) с удаленной ячейкой
    const arrX = accessToProp(map.x, pathX);
    const arrY = accessToProp(map.y, pathY);
    const innerTable = objToCheck.arr;

    return { arrX, arrY, innerTable };
  }
}

// функция возвращает возможные значения (массив или число) для пустой ячейки
function getCandidates(arr, map, getCoords) {

  return function (objToCheck, flag) {

    const { arrX, arrY, innerTable } = getCoords(objToCheck);

    // массив возможных значений для вставки в пустую ячейку
    let arrProbableNums = getArrayProbableValues(arr, arrX, arrY, innerTable);

    // если массив единичный, вернуть значение(число)
    if (arrProbableNums.length == 1) return arrProbableNums[0];

    if (flag === true) {

      // исследовать массив кандидатов с анализатором, исключить возможные варианты
      // возвращает массив возможных значений в ячейку
      const cellValue = analyzeCandidates({ objToCheck, arrX, arrY }, map);

      // если cellValue массив, присвоить arrProbableNums или вернуть cellValue[0]
      if (Array.isArray(cellValue)) {

        if (cellValue.length == 1) return cellValue[0];

        arrProbableNums = cellValue;
      }

      // если число, вернуть
      if (Number.isInteger(cellValue)) return cellValue;
    }

    // выполниться не должно
    if (arrProbableNums.length == 0) {
      console.log(JSON.stringify(map.mainTable, null, 2));
      throw new Error('Что-то пошло не так ===> Empty array of values!!!');
    }

    return arrProbableNums;
  }
}

function findSolutions(map, handler) {

  let isChecked = false;

  const scannerExtended = scannerArrExtended(scannerArr);

  // функция-повторитель для поиска решения
  // n = 100 - максимальное количество итераций поиска
  const multipleScaner = repeater(scannerExtended, 100);

  try {

    // функция scanerArr, обернутая в repeater,
    // находит пустые ячейки (или массивы) в числовой карте по координатам,
    // и подбирает возможные значения для этих ячеек
    isChecked = multipleScaner(map.mainTable, handler);

  } catch (err) {

    throw err;
  }

  return map;
}

function checkArr(func) {

  return function (array, flag) {

    let isPassed = true;

    for (let i = 0; i < array.length; i++) {

      if (typeof array[i].value != 'number') {

        isPassed = false;

        const objToCheck = { arr: array, cell: array[i] };

        // возвращает либо число либо массив
        const probableValue = func.call(this, objToCheck, flag); // candidatesToCell

        // установить возможное значение для 1-ой пустой ячейки из карты чисел
        array[i].value = probableValue;
      }
    }

    return isPassed;
  }
}

// сравнивает текущую числовую карту с предыдущей
// переключает режим flag (подключает анализатор)
function scannerArrExtended(origin) {

  // снимок текущей числовой карты
  let snapshotMap = null;
  let currentFlag = false;
  let retryCounter = 0;

  // обертка для scannerArr
  return function (...args) {

    let [map, handler] = args; // map -> mainTable

    // если числовая карта повторяется и решение не найдено с анализатором,
    // прекратить сканирование, начальные условия обновятся при следующей итерации поиска решения
    if (retryCounter >= 2) {

      return false;
    }

    // функция scannerArr
    // чтобы обойти всю числовую таблицу (mainTable), функция вызывается 10 раз 
    const result = origin.call(this, map, handler, currentFlag);

    const currentMap = JSON.stringify(map);

    // если числовая карта повторяется и решение не найдено с анализатором,
    // посчитать повторы числовой карты
    if (result === false && currentMap === snapshotMap && currentFlag === true) retryCounter++;

    // если числовая карта повторяется и решение не найдено
    // попытаться найти решение с анализатором
    if (result === false && currentMap === snapshotMap && currentFlag === false) currentFlag = true;

    // сделать снимок перед следующей итерацией в repeater
    snapshotMap = currentMap;

    // если решение найдено выключить поиск с анализатором
    // вернуться к начальным условиям
    if (result === true) {
      currentFlag = false;
      snapshotMap = null;
      retryCounter = 0;
    }

    return result;
  }
}

export { createTask, scannerArr, deleteNumbers, exceptNumbers };