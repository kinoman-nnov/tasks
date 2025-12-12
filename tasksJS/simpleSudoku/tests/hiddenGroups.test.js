import { hiddenPairMap, hiddenPairMap_2, hiddenThreeMap, hiddenFourMap } from './inputData/hiddenGroupsData.test.js';
import { getHiddenGroups } from "../src/analyzer/getHiddenGroups.js";
import { deepEqualWrapped } from './helpers.test.js';

// копия входного объекта
const instanceHiddenPairs = Object.create(hiddenPairMap);
const instanceHiddenPairs_2 = Object.create(hiddenPairMap_2);
const instanceHiddenThreesome = Object.create(hiddenThreeMap);
const mapInstanceFours = Object.create(hiddenFourMap);

// arrX, arrY - строка sectionX0.row0 и столбец sectionY0.column2
const { objToCheck: hiddenPairObj } = instanceHiddenPairs;
const { arrX: hiddenThreesomeObj } = instanceHiddenThreesome;
const { objToCheck: hiddenFourObj } = mapInstanceFours;

describe("Анализатор. Поиск скрытых групп", function () {

  describe("Найти скрытую пару", function () {

    // Исследуемые ячейки образуют "скрытую" пару [2, 4]

    // "value": [2, 4, 5, 6]
    // "address": {"axisX": "sectionX0.row0", "axisY": "sectionY0.column2", "innerTableId": 0}

    // "value": [2, 3, 4, 6, 7]
    // "address": {"axisX": 'sectionX0.row1', "axisY": 'sectionY0.column2', "innerTableId": 0}

    // Т.к. в 1-ем сегменте цифры 4 и 7 встречаются только в 2х ячейках,
    // то они образуют "скрытую пару" [2, 4]
    // поэтому остальные цифры можно удалить из кандидатов в ячейку

    it("Скрытая пара [2, 4]", function () {

      const hiddenPairItem = getHiddenGroups(hiddenPairObj.arr);

      const result = [2, 4];
      // при сравнении не учитывается порядок элементов
      const deepEqualCustom = deepEqualWrapped(assert.deepEqual, result);

      deepEqualCustom(hiddenPairItem.candidates, result, 'возвращает скрытую пару: [ 2, 4 ]');
    });
  });

  describe("Найти скрытую тройку", function () {

    it("Скрытая тройка [2, 5, 6]", function () {

      const hiddenThreeItem = getHiddenGroups(hiddenThreesomeObj);

      const result = [2, 5, 6];
      // при сравнении не учитывается порядок элементов
      const deepEqualCustom = deepEqualWrapped(assert.deepEqual, result);

      deepEqualCustom(hiddenThreeItem.candidates, result, 'возвращает скрытую тройку: [ 2, 5, 6 ]');
    });
  });
  
  describe("Найти скрытую четверку", function () {

    it("Скрытая четверка [1, 4, 6, 9]", function () {

      const hiddenFourItem = getHiddenGroups(hiddenFourObj.arr);
  
      const result = [1, 4, 6, 9];
      // при сравнении не учитывается порядок элементов
      const deepEqualCustom = deepEqualWrapped(assert.deepEqual, result);
  
      deepEqualCustom(hiddenFourItem.candidates, result, 'возвращает скрытую четверку: [ 1, 4, 6, 9 ]');
    });
  });
});