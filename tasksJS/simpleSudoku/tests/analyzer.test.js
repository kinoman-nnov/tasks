import { obj, mapInstance } from './inputData.test.js';
import { analyzeCandidates } from "../src/analyzer";

const { objToCheck, arrX, arrY } = obj;

describe("Анализатор. Исключение кандидатов", function () {
  // Исследуемая ячейка
  // "value": [6, 9]
  // "address": {"axisX": "sectionX0.row0", "axisY": "sectionY0.column2", "innerTableId": 0}
  // Т.к. в 3-ем сегменте в 1-ом ряду совпадают 2 массива [5, 6, 9], то цифру 6 необходимо
  // удалить из 1-го ряда 1-го сегмента
  describe("Сократить число кандидатов в ячейке с массивом возможных значений [6, 9]", function () {
    it("Число 6 исключается из кандидатов [6, 9]", function () {

      const arrProbableNums = objToCheck.arr[2].value;
      const slice =  analyzeCandidates({ objToCheck, arrX, arrY }, arrProbableNums, mapInstance);
      console.log(slice);
      
      assert.deepEqual(slice, [ 9 ], 'возвращает: [ 9 ]');
    });
  });
});

function makeTest(arr) {

}