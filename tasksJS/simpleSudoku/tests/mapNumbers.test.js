import {
  createMapNumbers,
  createMapNumbersCounter
} from '../src/createMapNumbers.js';
import {
  scannerArr,
  counter as counterTests,
  runTime
} from '../src/helpers.js';
import { inputData } from '../src/inputData.js';

const { arrData, size } = inputData;

// const sumArrData = arrData.reduce((sum, current) => sum + current, 0);
const sumArrData = sumArr(arrData);

// посчитать время выполнения, затраченное на поиск числовой карты
const createMapNumbersTimer = runTime(createMapNumbers);

const numbersMap = createMapNumbersTimer(arrData, size);

describe("Числовая карта", function () {
  
  before(() => {

    // время, затраченное на создание задачи
    console.log('=====> Время выполнения: ' + numbersMap.time + 'ms');
    // количество попыток затраченное на подбор решения repeater-ом
    console.log('=====> Попыток: ' + createMapNumbersCounter.calls);
  });

  describe("Сумма ряда по оси Х", function () {

    makeTest = counterTests(makeTest);
    makeTest.coor = 'X';

    const testSumRowX = handler(makeTest);

    scannerArr(numbersMap.x, testSumRowX);
  });

  describe("Сумма ряда по оси Y", function () {

    makeTest = counterTests(makeTest);
    makeTest.coor = 'Y';

    const testSumColumnY = handler(makeTest);

    scannerArr(numbersMap.y, testSumColumnY);
  });

  describe("Сумма чисел внутри i-ой таблицы", function () {

    makeTest2 = counterTests(makeTest2);

    const testSumTable = handler(makeTest2);

    scannerArr(numbersMap.mainTable, testSumTable);
  });
});

function makeTest(sum, func) {
  it(`сумма ряда ${func.coor}:${func.calls} равна ${sumArrData}`, function () {
    assert.equal(sum, sumArrData);
  });
}

function makeTest2(sum, func) {
  it(`сумма чисел внутри ${func.calls}-ой таблицы равна ${sumArrData}`, function () {
    assert.equal(sum, sumArrData);
  });
}

function sumArr(arr) {
  const result = arr.reduce((sum, current) => {
    if (typeof current === 'object') return sum + current.value;
    else return sum + current;
  }, 0);
  return result;
}

function handler(test) {

  return function (item) {

    test.call(this, sumArr(item), test);
    return true;
  }
}