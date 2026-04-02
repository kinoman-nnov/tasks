import { 
  pointingPairMap_table, 
  pointingPairMap_row, 
  pointingPairMap_column 
} from '../inputData/pointingGroupsData.test.js';
import { getPointingGroups } from '../../src/analyzer/getPointingGroups.js';

// копия входного объекта
const instancePointingPair = structuredClone(pointingPairMap_table);
const instancePointingPair_row = structuredClone(pointingPairMap_row);
const instancePointingPair_column = structuredClone(pointingPairMap_column);

// arrX, arrY - строка и столбец
const { objToCheck } = instancePointingPair;
const { arrX } = instancePointingPair_row;
const { arrY } = instancePointingPair_column;

describe("Анализатор. Поиск указывающих групп", function () {

  describe("Найти указывающую пару в таблице", function () {

    it("Указывающая пара [6, 6]", function () {

      const pointingPair = getPointingGroups(objToCheck.arr);

      const candidate = pointingPair.candidates;

      assert.deepEqual(candidate['sectionX0.row0'], [6], 'возвращает указывающую пару: [ 6, 6 ]');
    });
  });

  describe("Найти указывающую пару в ряду", function () {

    it("Указывающая пара [2, 2]", function () {

      const pointingPair_row = getPointingGroups(arrX);

      const candidate = pointingPair_row.candidates;

      assert.deepEqual(candidate['sectionX0.row0'], [2], 'возвращает указывающую пару: [ 2, 2 ]');
    });
  });

  describe("Найти указывающую пару в колонке", function () {

    it("Указывающая пара [3, 3]", function () {

      const pointingPair_column = getPointingGroups(arrY);

      const candidate = pointingPair_column.candidates;

      assert.deepEqual(candidate['sectionY1.column0'], [3], 'возвращает указывающую пару: [ 3, 3 ]');
    });
  });
});