import {
  pointingPairMap_table,
  pointingPairMap_row,
  pointingPairMap_column
} from "../inputData/pointingGroupsData.test.js";
import { getPointingGroups } from "../../src/analyzer/getPointingGroups";
import { excludeCandidates } from '../../src/analyzer/excludeCandidates.js';

// копия входного объекта
const instancePointingPair = structuredClone(pointingPairMap_table);
const instancePointingPair_row = structuredClone(pointingPairMap_row);
const instancePointingPair_column = structuredClone(pointingPairMap_column);

const { objToCheck } = instancePointingPair;
const { arrX } = instancePointingPair_row;
const { arrY } = instancePointingPair_column;

describe('Анализатор. Исключение кандидатов с помощью указывающих групп', function () {

  describe("Иключить кандидаты из массивов используя указывающую пару", function () {

    it("Таблица имеет указывающую пару [6, 6] в ряду row0. Удалить кандидатов из других ячеек этого ряда.", function () {

      const resultArrForPairInTable = [
        {
          value: 7,
          address: {
            axisX: 'sectionX0.row0',
            axisY: 'sectionY0.column0',
            innerTableId: 0
          }
        },
        {
          value: 3,
          address: {
            axisX: 'sectionX0.row0',
            axisY: 'sectionY0.column1',
            innerTableId: 0
          }
        },
        {
          value: 9,
          address: {
            axisX: 'sectionX0.row0',
            axisY: 'sectionY0.column2',
            innerTableId: 0
          }
        },
        {
          value: 8,
          address: {
            axisX: 'sectionX0.row0',
            axisY: 'sectionY1.column0',
            innerTableId: 1
          }
        },
        {
          value: 4,
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
          value: [5, 6, 9],
          address: {
            axisX: 'sectionX0.row0',
            axisY: 'sectionY2.column0',
            innerTableId: 2
          }
        },
        {
          value: [5, 6, 9],
          address: {
            axisX: 'sectionX0.row0',
            axisY: 'sectionY2.column1',
            innerTableId: 2
          }
        },
        {
          value: 2,
          address: {
            axisX: 'sectionX0.row0',
            axisY: 'sectionY2.column2',
            innerTableId: 2
          }
        }
      ];

      const pointingPairArr = objToCheck.arr;

      const pointingPairComb = getPointingGroups(pointingPairArr);

      if (pointingPairComb === null) return;

      const resultCplx = excludeCandidates(pointingPairArr, pointingPairComb, instancePointingPair);

      assert.deepEqual(resultCplx.arrX, resultArrForPairInTable, 'кандидаты [6] исключены из ряда');
    });

    it("Ряд имеет указывающую пару [2, 2]. Удалить кандидатов из других ячеек в таблице, которой принадлежит этот ряд.", function () {

      const resultArrForPairInRow = [
        {
          value: [2, 4, 5],
          address: {
            axisX: 'sectionX0.row0',
            axisY: 'sectionY1.column0',
            innerTableId: 1
          }
        },
        {
          value: [2, 4, 5, 9],
          address: {
            axisX: 'sectionX0.row0',
            axisY: 'sectionY1.column1',
            innerTableId: 1
          }
        },
        {
          value: 7,
          address: {
            axisX: 'sectionX0.row0',
            axisY: 'sectionY1.column2',
            innerTableId: 1
          }
        },
        {
          value: 8,
          address: {
            axisX: 'sectionX0.row1',
            axisY: 'sectionY1.column0',
            innerTableId: 1
          }
        },
        {
          value: [3, 4, 5, 6],
          address: {
            axisX: 'sectionX0.row1',
            axisY: 'sectionY1.column1',
            innerTableId: 1
          }
        },
        {
          value: [3, 4, 5, 6],
          address: {
            axisX: 'sectionX0.row1',
            axisY: 'sectionY1.column2',
            innerTableId: 1
          }
        },
        {
          value: [3, 4, 5],
          address: {
            axisX: 'sectionX0.row2',
            axisY: 'sectionY1.column0',
            innerTableId: 1
          }
        },
        {
          value: [3, 4, 5, 9],
          address: {
            axisX: 'sectionX0.row2',
            axisY: 'sectionY1.column1',
            innerTableId: 1
          }
        },
        {
          value: 1,
          address: {
            axisX: 'sectionX0.row2',
            axisY: 'sectionY1.column2',
            innerTableId: 1
          }
        }
      ];

      const pointingPairCombInRow = getPointingGroups(arrX);

      if (pointingPairCombInRow === null) return;

      const resultCplx = excludeCandidates(arrX, pointingPairCombInRow, instancePointingPair_row);

      assert.deepEqual(resultCplx.mainTable[1], resultArrForPairInRow, 'кандидаты [2] исключены из таблицы');
    });

    it("Колонка имеет указывающую пару [3, 3]. Удалить кандидатов из других ячеек в таблице, которой принадлежит эта колонка.", function () {

      const resultArrForPairInColumn = [
        {
          value: [3, 5],
          address: {
            axisX: 'sectionX2.row0',
            axisY: 'sectionY1.column0',
            innerTableId: 7
          }
        },
        {
          value: [1, 5, 6, 9],
          address: {
            axisX: 'sectionX2.row0',
            axisY: 'sectionY1.column1',
            innerTableId: 7
          }
        },
        {
          value: [1, 7, 9],
          address: {
            axisX: 'sectionX2.row0',
            axisY: 'sectionY1.column2',
            innerTableId: 7
          }
        },
        {
          value: 8,
          address: {
            axisX: 'sectionX2.row1',
            axisY: 'sectionY1.column0',
            innerTableId: 7
          }
        },
        {
          value: [4, 5, 6, 9],
          address: {
            axisX: 'sectionX2.row1',
            axisY: 'sectionY1.column1',
            innerTableId: 7
          }
        },
        {
          value: [4, 7, 9],
          address: {
            axisX: 'sectionX2.row1',
            axisY: 'sectionY1.column2',
            innerTableId: 7
          }
        },
        {
          value: [2, 3],
          address: {
            axisX: 'sectionX2.row2',
            axisY: 'sectionY1.column0',
            innerTableId: 7
          }
        },
        {
          value: [1, 2, 6, 9],
          address: {
            axisX: 'sectionX2.row2',
            axisY: 'sectionY1.column1',
            innerTableId: 7
          }
        },
        {
          value: [1, 2, 7, 9],
          address: {
            axisX: 'sectionX2.row2',
            axisY: 'sectionY1.column2',
            innerTableId: 7
          }
        }
      ];

      const pointingPairCombInColumn = getPointingGroups(arrY);

      if (pointingPairCombInColumn === null) return;

      const resultCplx = excludeCandidates(arrY, pointingPairCombInColumn, instancePointingPair_column);

      assert.deepEqual(resultCplx.mainTable[7], resultArrForPairInColumn, 'кандидаты [3] исключены из таблицы');
    });
  });
});