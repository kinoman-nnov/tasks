import { excludeCandidatesMap } from './inputData.test.js';
// import { analyzeCandidates } from "../src/analyzer";

// копия входного объекта
const mapInstanceCopy = Object.create(excludeCandidatesMap);

// arrX, arrY - строка sectionX0.row0 и столбец sectionY0.column2
const { objToCheck, arrX, arrY } = mapInstanceCopy;

describe("Анализатор. Исключение кандидатов", function () {
  // Исследуемая ячейка
  // "value": [6, 9]
  // "address": {"axisX": "sectionX0.row0", "axisY": "sectionY0.column2", "innerTableId": 0}
  // Т.к. в 3-ем сегменте в 1-ом ряду присутствует "указывающая пара" для цифры 6,
  // поэтому ее необходимо удалить из кандидатов в ячейку

  describe("Сократить число кандидатов в ячейке с массивом возможных значений [6, 9]", function () {
    
    it("Число 6 исключается из кандидатов [6, 9]", function () {

      const arrProbableNums = mapInstanceCopy.objToCheck.cell.value;
      const slice =  analyzeCandidates({ objToCheck, arrX, arrY }, arrProbableNums, mapInstanceCopy);
      
      assert.deepEqual(slice, [ 9 ], 'возвращает: [ 9 ]');
    });
  });
});