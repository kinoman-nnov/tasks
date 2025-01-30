describe("table", function () {

  let sudoku = createTableSudoku(createTable, sudokuElem);

  function sumRowX(item) {
    if (Array.isArray(item)) {

      let result = item.reduce((prev, current) => prev + current, 0);

      testSumRowX(result);
      return result;
    } else {
      for (let inner of Object.values(item)) {

        sumRowX(inner);
      }
      return;
    }
  }

  function counterTests(func) {
    let count = 0;
  
    function wrap() {
      wrap.calls = count++;
      
      return func.apply(this, arguments);
    }
    wrap.calls = count;
    return wrap;
  }
  
  function makeTest(sum) {  
    it(`сумма ряда X:${testSumRowX.calls} равна 45`, function () {
        assert.equal(sum, 45);
    });
  }
  
  let testSumRowX = counterTests(makeTest);

  // function makeTest() {
  //   let count = 0;
  
  //   return function(sum) {
  //     it(`сумма ряда X:${count} равна 45`, function () {
  //       assert.equal(sum, 45);
  //     });
  
  //     return count++;
  //   };
  // }
  
  // let testSumX = makeTest();

  sumRowX(sudoku)
});