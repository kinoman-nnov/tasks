import { pointingGroupMap } from './inputData/pointingGroupsData.test';
import { pointingGroupMap_row } from './inputData/pointingGroupsData.test';
import { pointingGroupMap_column } from './inputData/pointingGroupsData.test';
import { getPointingGroups } from '../src/analyzer/getPointingGroups.js'

// копия входного объекта
const instancePointingPairs = structuredClone(pointingGroupMap);
const instancePointingPairs_row = structuredClone(pointingGroupMap_row);
const instancePointingPairs_column = structuredClone(pointingGroupMap_column);

// arrX, arrY - строка sectionX0.row0 и столбец sectionY0.column2
const { objToCheck } = instancePointingPairs;
const { arrX } = instancePointingPairs_row;
const { arrY } = instancePointingPairs_column;

describe("Анализатор. Поиск <<указывающих>> групп", function () {
  // Исследуемая ячейка
  // "value": [6, 9]
  // "address": {"axisX": "sectionX0.row0", "axisY": "sectionY0.column2", "innerTableId": 0}
  // Т.к. в 3-ем сегменте в 1-ом ряду присутствует "указывающая пара" для цифры 6,
  // поэтому ее необходимо удалить из кандидатов в ячейку

  describe("Найти <<указывающую>> пару в таблице", function () {

    it("<<Указывающая>> пара [6, 6] в таблице", function () {

      const pointingPairItem = getPointingGroups(objToCheck.arr);

      assert.deepEqual(pointingPairItem.candidates, [6], 'возвращает: [ 6 ]');
    });
  });

  describe("Найти <<указывающую>> пару в ряду", function () {

    it("<<Указывающая>> пара [2, 2] в ряду", function () {

      const pointingPairItem_row = getPointingGroups(arrX);

      assert.deepEqual(pointingPairItem_row.candidates, [2], 'возвращает: [ 2 ]');
    });
  });

  describe("Найти <<указывающую>> пару в колонке", function () {

    it("<<Указывающая>> пара [4, 4] в колонке", function () {

      const pointingPairItem_column = getPointingGroups(arrY);

      assert.deepEqual(pointingPairItem_column.candidates, [4], 'возвращает: [ 4 ]');
    });
  });
});