let sumArrData = arrData.reduce((sum, current) => sum + current, 0);

describe("table", function () {
  
  if (numbersMap == null) return;

  describe("Сумма ряда по оси Х", function () {

    let testSumRowX = counterTests(makeTest);
    testSumRowX.coor = 'X';

    sumRow(numbersMap.x, testSumRowX);
  });
  describe("Сумма ряда по оси Y", function () {

    let testSumColumnY = counterTests(makeTest);
    testSumColumnY.coor = 'Y';

    sumRow(numbersMap.y, testSumColumnY);
  });
  describe("Сумма чисел внутри i-ой таблицы", function () {

    let testSumTable = counterTests(makeTest2);
  
    sumRow(numbersMap.mainTable, testSumTable);
  });
});

function makeTest(sum, func) {
  it(`сумма ряда ${func.coor}:${func.calls} равна ${sumArrData}`, function () {
    assert.equal(sum, sumArrData);
  });
}

function makeTest2(sum, func) {
  it(`сумма чисел внутри ${func.calls + 1}-ой таблицы равна ${sumArrData}`, function () {
    assert.equal(sum, sumArrData);
  });
}

// функция-обертка добавляет счетчик вызовов функции
function counterTests(func) {
  let count = 0;

  function wrap() {
    wrap.calls = count++;

    return func.apply(this, arguments);
  }
  wrap.calls = count;
  return wrap;
}

function sumRow(item, func) {
  if (Array.isArray(item)) {

    let result = item.reduce((prev, current) => prev + current, 0);

    func.call(this, result, func);
    return result;
  } else {
    for (let elem of Object.values(item)) {

      sumRow(elem, func);
    }
    return;
  }
}