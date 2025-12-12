import { inputData } from '../src/inputData.js';
import { exceptionArr as getArrayProbableValues } from "../src/helpers.js";
import { excludeCandidatesMap } from './inputData/excludeCandidatesData.test.js';

const { arrData } = inputData;

// копия входного объекта
const mapInstanceCopy = Object.create(excludeCandidatesMap);

// присвоить 9-ой ячейке 1-ой таблицы значение null
mapInstanceCopy.mainTable[0][8].value = null;

// arrX, arrY - строка sectionX0.row0 и столбец sectionY0.column2
const { objToCheck, arrX, arrY } = mapInstanceCopy;

describe("Поиск возможных кандидатов", function () {
  it("Массив возможных кандидатов в ячейку равен [5, 6, 9]", function () {

    const candidatesToCell = getArrayProbableValues(arrData, arrX, arrY, mapInstanceCopy.mainTable[0]);

    assert.deepEqual(candidatesToCell, [5, 6, 9], 'возвращает: [ 5, 6, 9 ]');
  });
});