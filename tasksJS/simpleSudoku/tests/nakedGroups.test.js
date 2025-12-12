import { nakedPairMap, nakedThreesomeMap, nakedFourMap } from './inputData/nakedGroupsData.test.js';
import { getNakedGroups } from '../src/analyzer/getNakedGroups.js';
import { deepEqualWrapped } from './helpers.test.js';

// копия входного объекта
const instanceNakedPairs = Object.create(nakedPairMap);
const instanceNakedThreesome = Object.create(nakedThreesomeMap);
const instanceNakedFours = Object.create(nakedFourMap);

// arrX, arrY - строка sectionX0.row0 и столбец sectionY0.column2
const { arrX: nakedPairObj} = instanceNakedPairs;
const { arrX: nakedThreesomeObj } = instanceNakedThreesome;
const { objToCheck: nakedFourObj } = instanceNakedFours;

describe("Анализатор. Поиск <<голых>> групп", function () {

  describe("Найти <<голую>> пару", function () {

    it("<<Голая>> пара [1, 6]", function () {

      const nakedPairItem = getNakedGroups(nakedPairObj);

      const result = [1, 6];
      // при сравнении не учитывается порядок элементов
      const deepEqualCustom = deepEqualWrapped(assert.deepEqual, result);

      deepEqualCustom(nakedPairItem.candidates, result, 'возвращает <<голую>> пару: [ 1, 6 ]');
    });
  });

  describe("Найти <<голую>> тройку", function () {
    
    it("<<Голая>> тройка [5, 8, 9]", function () {

      const hiddenThreeItem = getNakedGroups(nakedThreesomeObj);

      const result = [5, 8, 9];
      // при сравнении не учитывается порядок элементов
      const deepEqualCustom = deepEqualWrapped(assert.deepEqual, result);

      deepEqualCustom(hiddenThreeItem.candidates, result, 'возвращает скрытую тройку: [ 5, 8, 9 ]');
    });

  });

  describe("Найти <<голую>> четверку", function () {

    it("<<Голая>> четверка [1, 5, 6, 8]", function () {

      const hiddenFourItem = getNakedGroups(nakedFourObj.arr);

      const result = [1, 5, 6, 8];
      // при сравнении не учитывается порядок элементов
      const deepEqualCustom = deepEqualWrapped(assert.deepEqual, result);

      deepEqualCustom(hiddenFourItem.candidates, result, 'возвращает скрытую четверку: [ 1, 5, 6, 8 ]');
    });
  });
});