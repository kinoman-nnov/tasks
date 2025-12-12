import { inputData } from './inputData.js';
import {
  exceptionArr as getArrayProbableValues,
  scannerArr,
  repeater,
  randomInteger,
  accessToProp,
  counter
} from './helpers.js';
import { analyzeCandidates } from './analyzer.js';

const { size } = inputData;

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
  const originMap = JSON.stringify(map);

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
      n = 60;
      break;
  }

  let i = 0;
  let iterationNum = 0;
  let count = 0;
n=35
  try {

    while (i < n) {

      iterationNum++;

      // прервать выполнение, чтобы не превысить максимальный размер стека вызовов
      if (iterationNum > 50000) throw new Error('Не могу найти решение!');

      // если размер коллекции исключений превышает пороговое значение
      // прекратить поиск пустых ячеек
      // if ((deleteNumbers.size + exceptNumbers.size) == size ** 4) return true;

      // сгенерировать случайную таблицу и случайную ячейку для удаления
      let rndTable = randomInteger(0, arr.length - 1);
      let rndItem = randomInteger(0, arr.length - 1);

      // создать ключ
      let key = String(rndTable) + String(rndItem);

      // если коллекции deleteNumbers и exceptNumbers уже содержат комбинацию с таким ключом,
      // прекратить выполнение
      if (deleteNumbers.has(key)) continue;
      // if (exceptNumbers.has(key)) continue;
      count++;
      // случайная ячейка из числовой карты
      const rndCell = map.mainTable[rndTable][rndItem];

      // добавить ячейку в коллекцию
      deleteNumbers.set(key, rndCell);

      // удалить число в выбранной ячейке и запомнить
      const deletedNumber = rndCell.value;
      rndCell.value = null;

      // ряд, колонка и таблица удаленной ячейки
      const coordsEmptyCell = getCoordsEmptyCell(map);

      // посчитать возможные значения (массив или число) для пустой ячейки
      const candidatesToCell = getCandidates(arr, map, coordsEmptyCell);

      // добавить обработчик
      // проверить массив, если есть пустоты - заполнить
      const handler = checkArr(candidatesToCell);

      // попытаться найти решение (заполнить пустые ячейки),
      // если решение найдено, вернуть map
      const currentMap = findSolutions(map, handler);
      const currentMapJSON = JSON.stringify(currentMap);

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
        // exceptNumbers.set(key, rndCell);
      }

      // обнулить проверенные решения, перед следующей итерацией поиска решения
      for (const [key, objVal] of deleteNumbers) {

        objVal.value = null;

        deleteNumbers.set(key, objVal);
      }
    }

  } catch (err) {

    console.log(map);
    // console.log("%c" + err, "color:red");
    console.log(err);
    
  }
  console.log('iterationNum:', iterationNum);
  console.log('попыток:', count);

  return true;
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

    if (flag === true) {
    
      // исследовать массив кандидатов на исключение
      arrProbableNums = analyzeCandidates({ objToCheck, arrX, arrY }, map);
    }

    // если массив единичный, вернуть значение
    if (arrProbableNums.length == 1) return arrProbableNums[0];

    return arrProbableNums;
  }
}

function findSolutions(map, handler) {

  let isChecked = false;
  let flag = false;

  try {
    isChecked = multipleScaner(map.mainTable, handler, flag); // подключает анализатор, когда flag = true;

    // console.log(JSON.stringify(map)===snapshot);

    // if (isChecked === false && currentMap === snapshot) console.log(isChecked);

  } catch (err) {

    // console.log(err);
    // return null;
    throw err;
  }

  return map;
  // если массивы прошли проверку вернуть числовую карту
  // if (isChecked === true) return map;

  // else return null;
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

        if (typeof probableValue == 'number') isPassed = true;

        // установить возможное значение для 1-ой пустой ячейки из карты чисел
        array[i].value = probableValue;
      }
    }

    return isPassed;
  }
}

// сравнивает текущую числовую карту с предыдущей
// после каждой итерации repeater
function scannerArrExtended(origin) {

  // снимок текущей числовой карты
  let snapshotMap = null;
  let currentFlag = false;

  // обертка для scannerArr
  return function (...args) {

    let [map, handler, flag] = args;

    const result = origin.call(this, map, handler, currentFlag);  // функция scannerArr

    const currentMap = JSON.stringify(map);

    if (result === false && currentMap === snapshotMap) {

      // если числовая карта повторяется и решение не найдено
      // попытаться найти решение с анализатором
      currentFlag = true;

    } else currentFlag = false;

    snapshotMap = currentMap;

    return result;
  }
}

const scannerExtended = scannerArrExtended(scannerArr);

// функция-повторитель для поиска решения
// n - максимальное количество итераций поиска
const multipleScaner = repeater(scannerExtended, 100);

export { createTask, scannerArr, deleteNumbers, exceptNumbers };