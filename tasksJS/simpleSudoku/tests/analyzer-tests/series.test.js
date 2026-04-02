import { inputData } from "../../src/inputData.js";
import { exceptionArr as getArrayProbableValues } from "../../src/helpers.js";
import { seriesNakedFourLoopMap } from "../inputData/arrayProbableValuesData.test.js";
import { pointingPairMap_column } from "../inputData/pointingGroupsData.test.js";
import { hiddenThreesomeMap } from '../inputData/hiddenGroupsData.test.js';
import { nakedFourMap } from "../inputData/nakedGroupsData.test.js";

import {
  solutionPointingPairMap_column,
  solutionHiddenThreesomeMap,
  solutionNakedFourMap
} from "../inputData/solutionsSeriesData.test.js";

import { analyzeCandidates } from "../../src/analyzer.js";

const { arrData } = inputData;

// копия входного объекта
const instanceProbableValues = structuredClone(seriesNakedFourLoopMap);
const instancePointingPair = structuredClone(pointingPairMap_column);
const instanceHiddenThreesome = structuredClone(hiddenThreesomeMap);
const instanceNakedFour = structuredClone(nakedFourMap);

const solutionPointingPairMap = structuredClone(solutionPointingPairMap_column);
const solutionHiddenThreesome = structuredClone(solutionHiddenThreesomeMap);
const solutionNakedFour = structuredClone(solutionNakedFourMap);

describe('Анализатор. Серия тестов', function () {

  it('Выполнить серию тестов для числовой карты с указывающей парой', function () {

    const { objToCheck, arrX, arrY } = instancePointingPair;

    const solutionPointingMapJSON = JSON.stringify(solutionPointingPairMap.mainTable);

    const cellValue = analyzeCandidates({ objToCheck, arrX, arrY }, instancePointingPair);

    const currentPointingMapJSON = JSON.stringify(instancePointingPair.mainTable);

    assert.equal(currentPointingMapJSON, solutionPointingMapJSON, 'карта решения и текущая числовая карта равны');
  });

  it('Выполнить серию тестов для числовой карты с скрытой тройкой', function () {

    const { objToCheck, arrX, arrY } = instanceHiddenThreesome;

    const solutionHiddenMapJSON = JSON.stringify(solutionHiddenThreesome.mainTable);

    const cellValue = analyzeCandidates({ objToCheck, arrX, arrY }, instanceHiddenThreesome);

    const currentHiddenMapJSON = JSON.stringify(instanceHiddenThreesome.mainTable);

    assert.equal(currentHiddenMapJSON, solutionHiddenMapJSON, 'карта решения и текущая числовая карта равны');
  });

  it('Выполнить серию тестов для числовой карты с "голой" четверкой', function () {

    const { objToCheck, arrX, arrY } = instanceNakedFour;

    const solutionNakedMapJSON = JSON.stringify(solutionNakedFour.mainTable);

    const cellValue = analyzeCandidates({ objToCheck, arrX, arrY }, instanceNakedFour);

    const currentNakedMapJSON = JSON.stringify(instanceNakedFour.mainTable);

    assert.equal(currentNakedMapJSON, solutionNakedMapJSON, 'карта решения и текущая числовая карта равны');
  });

  it('Выполнить серию тестов в цикле (10 повторений)', function () {

    // взята карта и решение для "голой четверки"
    // map.mainTable[0][0].value = null;
    const { objToCheck, arrX, arrY } = instanceProbableValues;
    const solutionMapJSON = JSON.stringify(solutionNakedFour.mainTable);
    
    let i = 0;
    while (i < 10) {
    
      let arrProbableNums = getArrayProbableValues(arrData, arrX, arrY, objToCheck.arr);

      objToCheck.cell.value = arrProbableNums;
      
      arrProbableNums = analyzeCandidates({ objToCheck, arrX, arrY }, instanceProbableValues);
      i++;
    }

    const currentMapJSON = JSON.stringify(instanceProbableValues.mainTable);

    assert.equal(currentMapJSON, solutionMapJSON, 'карта решения и текущая числовая карта равны');
  });
});