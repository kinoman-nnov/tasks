import {
  nakedPairMap,
  nakedThreesomeMap,
  nakedFourMap
} from '../inputData/nakedGroupsData.test.js';
import { getNakedGroups } from "../../src/analyzer/getNakedGroups";
import { excludeCandidates } from '../../src/analyzer/excludeCandidates.js';

// копия входного объекта
const instanceNakedPairs = structuredClone(nakedPairMap);
const instanceNakedThreesome = structuredClone(nakedThreesomeMap);
const instanceNakedFours = structuredClone(nakedFourMap);

// arrX, arrY - строка sectionX0.row0 и столбец sectionY0.column2
const { arrX: nakedPairObj } = instanceNakedPairs;
const { arrX: nakedThreesomeObj } = instanceNakedThreesome;
const { objToCheck: nakedFourObj } = instanceNakedFours;

describe('Анализатор. Исключение кандидатов с помощью <<голых>> групп', function () {

  describe("Иключить кандидаты из массивов используя <<голую>> пару", function () {

    it("Ряд имеет <<голую>> пару [1, 6]. Исключить пару кандидатов из других ячеек.", function () {

      const resultArrForPair = [
        {
          value: 4,
          address: {
            axisX: 'sectionX1.row1',
            axisY: 'sectionY0.column0',
            innerTableId: 0
          }
        },
        {
          value: [1, 6],
          address: {
            axisX: 'sectionX1.row1',
            axisY: 'sectionY0.column1',
            innerTableId: 0
          }
        },
        {
          value: [1, 6],
          address: {
            axisX: 'sectionX1.row1',
            axisY: 'sectionY0.column2',
            innerTableId: 0
          }
        },
        {
          value: [2, 5],
          address: {
            axisX: 'sectionX1.row1',
            axisY: 'sectionY1.column0',
            innerTableId: 0
          }
        },
        {
          value: [2, 5, 7],
          address: {
            axisX: 'sectionX1.row1',
            axisY: 'sectionY1.column1',
            innerTableId: 0
          }
        },
        {
          value: [2, 5, 7],
          address: {
            axisX: 'sectionX1.row1',
            axisY: 'sectionY1.column2',
            innerTableId: 0
          }
        },
        {
          value: 9,
          address: {
            axisX: 'sectionX1.row1',
            axisY: 'sectionY2.column0',
            innerTableId: 0
          }
        },
        {
          value: 3,
          address: {
            axisX: 'sectionX1.row1',
            axisY: 'sectionY2.column1',
            innerTableId: 0
          }
        },
        {
          value: 8,
          address: {
            axisX: 'sectionX1.row1',
            axisY: 'sectionY2.column2',
            innerTableId: 0
          }
        }
      ];

      const nakedPairComb = getNakedGroups(nakedPairObj);

      if (nakedPairComb === null) return;

      const resultCplx = excludeCandidates(nakedPairObj, nakedPairComb, nakedPairObj);

      assert.deepEqual(resultCplx, resultArrForPair, 'кандидаты [1, 6] исключены');
    });
  });

  describe("Иключить кандидаты из массивов используя <<голую>> тройку", function () {

    it("Ряд имеет <<голую>> тройку [5, 8, 9]. Исключить тройку кандидатов из других ячеек.", function () {

      const resultArrForThreesome = [
        {
          value: [4, 6, 7],
          address: {
            axisX: 'sectionX1.row1',
            axisY: 'sectionY0.column0',
            innerTableId: 0
          }
        },
        {
          value: 2,
          address: {
            axisX: 'sectionX1.row1',
            axisY: 'sectionY0.column1',
            innerTableId: 0
          }
        },
        {
          value: [1, 6, 7],
          address: {
            axisX: 'sectionX1.row1',
            axisY: 'sectionY0.column2',
            innerTableId: 0
          }
        },
        {
          value: [5, 8, 9],
          address: {
            axisX: 'sectionX1.row1',
            axisY: 'sectionY1.column0',
            innerTableId: 0
          }
        },
        {
          value: [5, 8],
          address: {
            axisX: 'sectionX1.row1',
            axisY: 'sectionY1.column1',
            innerTableId: 0
          }
        },
        {
          value: [5, 9],
          address: {
            axisX: 'sectionX1.row1',
            axisY: 'sectionY1.column2',
            innerTableId: 0
          }
        },
        {
          value: 3,
          address: {
            axisX: 'sectionX1.row1',
            axisY: 'sectionY2.column0',
            innerTableId: 0
          }
        },
        {
          value: [3, 4],
          address: {
            axisX: 'sectionX1.row1',
            axisY: 'sectionY2.column1',
            innerTableId: 0
          }
        },
        {
          value: [1, 6],
          address: {
            axisX: 'sectionX1.row1',
            axisY: 'sectionY2.column2',
            innerTableId: 0
          }
        }
      ];

      const nakedThreesomeComb = getNakedGroups(nakedThreesomeObj);

      if (nakedThreesomeComb === null) return;

      const resultCplx = excludeCandidates(nakedThreesomeObj, nakedThreesomeComb, nakedThreesomeObj);

      assert.deepEqual(resultCplx, resultArrForThreesome, 'кандидаты [5, 8, 9] исключены');
    });
  });

  describe("Иключить кандидаты из массивов используя <<голую>> четверку", function () {

    it("Таблица имеет <<голую>> четверку [1, 5, 6, 8]. Исключить четверку кандидатов из других ячеек.", function () {

      const resultArrForFour = [
        {
          value: [1, 5],
          address: {
            axisX: 'sectionX0.row0',
            axisY: 'sectionY0.column0',
            innerTableId: 0
          }
        },
        {
          value: [2, 4],
          address: {
            axisX: 'sectionX0.row0',
            axisY: 'sectionY0.column1',
            innerTableId: 0
          }
        },
        {
          value: [2, 4, 7],
          address: {
            axisX: 'sectionX0.row0',
            axisY: 'sectionY0.column2',
            innerTableId: 0
          }
        },
        {
          value: [1, 5, 6, 8],
          address: {
            axisX: 'sectionX0.row1',
            axisY: 'sectionY0.column0',
            innerTableId: 0
          }
        },
        {
          value: [1, 5, 6, 8],
          address: {
            axisX: 'sectionX0.row1',
            axisY: 'sectionY0.column1',
            innerTableId: 0
          }
        },
        {
          value: [3, 7],
          address: {
            axisX: 'sectionX0.row1',
            axisY: 'sectionY0.column2',
            innerTableId: 0
          }
        },
        {
          value: [1, 6],
          address: {
            axisX: 'sectionX0.row2',
            axisY: 'sectionY0.column0',
            innerTableId: 0
          }
        },
        {
          value: 9,
          address: {
            axisX: 'sectionX0.row2',
            axisY: 'sectionY0.column1',
            innerTableId: 0
          }
        },
        {
          value: [3, 4],
          address: {
            axisX: 'sectionX0.row2',
            axisY: 'sectionY0.column2',
            innerTableId: 0
          }
        }
      ];

      const nakedFourArr = nakedFourObj.arr;

      const nakedFourComb = getNakedGroups(nakedFourArr);

      if (nakedFourComb === null) return;

      const resultCplx = excludeCandidates(nakedFourArr, nakedFourComb, nakedFourArr);

      assert.deepEqual(resultCplx, resultArrForFour, 'кандидаты [1, 5, 6, 8] исключены');
    });
  });
});