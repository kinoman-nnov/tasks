import { xWingMap } from "../inputData/xWingData.test.js";
import { getXWingCandidate } from "../../src/analyzer/getXWingCandidate.js";

// копия входного объекта
const instancexWingMap = structuredClone(xWingMap);

// таблицы рядов и столбцов
const { x, y } = instancexWingMap;

describe("Анализатор. Поиск X-wing кандидатов", function () {

  it("X-Wing кандидат в первом и последнем ряду равен 6", function() {

    const xWingCandidate = getXWingCandidate(x);

    assert.deepEqual(xWingCandidate[0], 6, 'возвращает ячейку с X-wing кандидатом 6');
  });
});