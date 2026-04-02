import { inputData } from '../src/inputData.js';
import { exceptionArr as getArrayProbableValues } from "../src/helpers.js";
import { arrayProbableValues } from './inputData/arrayProbableValuesData.test.js';

const { arrData } = inputData;

// копия входного объекта
const mapInstanceCopy = structuredClone(arrayProbableValues);

// присвоить 9-ой ячейке 1-ой таблицы значение null
mapInstanceCopy.mainTable[1][0].value = null;

// arrX, arrY - строка sectionX0.row0 и столбец sectionY0.column2
const { objToCheck, arrX, arrY } = mapInstanceCopy;

describe("Поиск возможных кандидатов", function () {
  it("Массив возможных кандидатов в ячейку равен [5, 6, 9]", function () {

    const candidatesToCell = getArrayProbableValues(arrData, arrX, arrY, objToCheck.arr);

    assert.deepEqual(candidatesToCell, [5, 6, 9], 'возвращает: [ 5, 6, 9 ]');
  });
});