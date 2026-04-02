import {
  hiddenPairMap,
  hiddenThreesomeMap,
  hiddenFourMap
} from '../inputData/hiddenGroupsData.test.js';
import { getHiddenGroups } from "../../src/analyzer/getHiddenGroups";
import { excludeCandidates } from '../../src/analyzer/excludeCandidates.js';

// копия входного объекта
const instanceHiddenPair = structuredClone(hiddenPairMap);
const instanceHiddenThreesome = structuredClone(hiddenThreesomeMap);
const instanceHiddenFour = structuredClone(hiddenFourMap);

const { objToCheck: hiddenPairObj } = instanceHiddenPair;
const { arrX: hiddenThreesomeArr } = instanceHiddenThreesome;
const { objToCheck: hiddenFourObj } = instanceHiddenFour;

describe('Анализатор. Исключение кандидатов с помощью скрытых групп', function () {

  describe("Иключить кандидаты из массивов используя скрытую пару", function () {

    it("Таблица имеет скрытую пару [2, 4]. Удалить других кандидатов внутри скрытой пары.", function () {

      const resultArrForPair = [
        {
          value: 8,
          address: {
            axisX: 'sectionX0.row0',
            axisY: 'sectionY0.column0',
            innerTableId: 0
          }
        },
        {
          value: 1,
          address: {
            axisX: 'sectionX0.row0',
            axisY: 'sectionY0.column1',
            innerTableId: 0
          }
        },
        {
          value: [2, 4],
          address: {
            axisX: 'sectionX0.row0',
            axisY: 'sectionY0.column2',
            innerTableId: 0
          }
        },
        {
          value: [6, 9],
          address: {
            axisX: 'sectionX0.row1',
            axisY: 'sectionY0.column0',
            innerTableId: 0
          }
        },
        {
          value: [3, 7, 9],
          address: {
            axisX: 'sectionX0.row1',
            axisY: 'sectionY0.column1',
            innerTableId: 0
          }
        },
        {
          value: [2, 4],
          address: {
            axisX: 'sectionX0.row1',
            axisY: 'sectionY0.column2',
            innerTableId: 0
          }
        },
        {
          value: [5, 9],
          address: {
            axisX: 'sectionX0.row2',
            axisY: 'sectionY0.column0',
            innerTableId: 0
          }
        },
        {
          value: [3, 5, 7, 9],
          address: {
            axisX: 'sectionX0.row2',
            axisY: 'sectionY0.column1',
            innerTableId: 0
          }
        },
        {
          value: [3, 5, 7],
          address: {
            axisX: 'sectionX0.row2',
            axisY: 'sectionY0.column2',
            innerTableId: 0
          }
        }
      ];

      const hiddenPairArr = hiddenPairObj.arr;

      const hiddenPairComb = getHiddenGroups(hiddenPairArr);

      if (hiddenPairComb === null) return;

      const resultCplx = excludeCandidates(hiddenPairArr, hiddenPairComb, hiddenPairArr);

      assert.deepEqual(resultCplx, resultArrForPair, 'кандидаты кроме [1, 6] исключены');
    });
  });

  describe("Иключить кандидаты из массивов используя скрытую тройку", function () {

    it("Ряд имеет скрытую тройку [2, 5, 6]. Удалить других кандидатов внутри скрытой тройки.", function () {

      const resultArrForThreesome = [
        {
          value: [4, 7, 8, 9],
          address: {
            axisX: 'sectionX0.row0',
            axisY: 'sectionY0.column0',
            innerTableId: 0
          }
        },
        {
          value: [4, 8, 9],
          address: {
            axisX: 'sectionX0.row0',
            axisY: 'sectionY0.column1',
            innerTableId: 0
          }
        },
        {
          value: [4, 7],
          address: {
            axisX: 'sectionX0.row0',
            axisY: 'sectionY0.column2',
            innerTableId: 0
          }
        },
        {
          value: [2, 5, 6],
          address: {
            axisX: 'sectionX0.row0',
            axisY: 'sectionY1.column0',
            innerTableId: 1
          }
        },
        {
          value: [4, 7, 8],
          address: {
            axisX: 'sectionX0.row0',
            axisY: 'sectionY1.column1',
            innerTableId: 1
          }
        },
        {
          value: 1,
          address: {
            axisX: 'sectionX0.row0',
            axisY: 'sectionY1.column2',
            innerTableId: 1
          }
        },
        {
          value: [2, 6],
          address: {
            axisX: 'sectionX0.row0',
            axisY: 'sectionY2.column0',
            innerTableId: 2
          }
        },
        {
          value: 3,
          address: {
            axisX: 'sectionX0.row0',
            axisY: 'sectionY2.column1',
            innerTableId: 2
          }
        },
        {
          value: [2, 5],
          address: {
            axisX: 'sectionX0.row0',
            axisY: 'sectionY2.column2',
            innerTableId: 2
          }
        }
      ];

      const hiddenThreesomeComb = getHiddenGroups(hiddenThreesomeArr);

      if (hiddenThreesomeComb === null) return;

      const resultCplx = excludeCandidates(hiddenThreesomeArr, hiddenThreesomeComb, hiddenThreesomeArr);

      assert.deepEqual(resultCplx, resultArrForThreesome, 'кандидаты кроме [2, 5, 6] исключены');
    });
  });

  describe("Иключить кандидаты из массивов используя скрытую четверку", function () {

    it("Таблица имеет скрытую четверку [1, 4, 6, 9]. Удалить других кандидатов внутри скрытой четверки.", function () {

      const resultArrForFour = [
        {
          value: [1, 4, 6, 9],
          address: {
            axisX: 'sectionX0.row0',
            axisY: 'sectionY1.column0',
            innerTableId: 1
          }
        },
        {
          value: [3, 7, 8],
          address: {
            axisX: 'sectionX0.row0',
            axisY: 'sectionY1.column1',
            innerTableId: 1
          }
        },
        {
          value: [4, 6, 9],
          address: {
            axisX: 'sectionX0.row0',
            axisY: 'sectionY1.column2',
            innerTableId: 1
          }
        },
        {
          value: [2, 3, 7, 8],
          address: {
            axisX: 'sectionX0.row1',
            axisY: 'sectionY1.column0',
            innerTableId: 1
          }
        },
        {
          value: [2, 3, 5, 7, 8],
          address: {
            axisX: 'sectionX0.row1',
            axisY: 'sectionY1.column1',
            innerTableId: 1
          }
        },
        {
          value: [2, 3, 5, 7, 8],
          address: {
            axisX: 'sectionX0.row1',
            axisY: 'sectionY1.column2',
            innerTableId: 1
          }
        },
        {
          value: [1, 4, 9],
          address: {
            axisX: 'sectionX0.row2',
            axisY: 'sectionY1.column0',
            innerTableId: 1
          }
        },
        {
          value: [3, 5, 7, 8],
          address: {
            axisX: 'sectionX0.row2',
            axisY: 'sectionY1.column1',
            innerTableId: 1
          }
        },
        {
          value: [4, 9],
          address: {
            axisX: 'sectionX0.row2',
            axisY: 'sectionY1.column2',
            innerTableId: 1
          }
        }
      ];

      const hiddenFourArr = hiddenFourObj.arr;

      const hiddenFourComb = getHiddenGroups(hiddenFourArr);

      if (hiddenFourComb === null) return;

      const resultCplx = excludeCandidates(hiddenFourArr, hiddenFourComb, hiddenFourArr);

      assert.deepEqual(resultCplx, resultArrForFour, 'кандидаты кроме [1, 4, 6, 9] исключены');
    });
  });
});