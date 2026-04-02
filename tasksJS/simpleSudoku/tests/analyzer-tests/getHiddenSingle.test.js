import { hiddenSingleMap } from '../inputData/hiddenSingleData.test.js'

import { getHiddenSingle } from "../../src/analyzer/getHiddenSingle.js";

// копия входного объекта
const instanceHiddenSingle = structuredClone(hiddenSingleMap);

const { objToCheck, arrX, arrY } = instanceHiddenSingle;

const { arr, cell } = objToCheck;

describe("Анализатор. Поиск скрытого сингла", function () {

  describe("Найти скрытый сингл в ряду", function () {

    it("Скрытый сингл в массиве [1, 5] равен 5", function () {

      const hiddenSingle = getHiddenSingle(arrX, cell);

      assert.deepEqual(hiddenSingle.candidates[0], 5, 'возвращает ячейку с скрытым синглом 5');
    });
  });
});
