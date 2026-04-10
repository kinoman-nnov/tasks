import { getHiddenSingle } from "./analyzer/getHiddenSingle.js";

import { getNakedGroups } from "./analyzer/getNakedGroups.js";
import { getHiddenGroups } from "./analyzer/getHiddenGroups.js";
import { getPointingGroups } from "./analyzer/getPointingGroups.js";

import { excludeCandidates } from "./analyzer/excludeCandidates.js";

import { hasNoNull } from "./helpers.js";

export function analyzeCandidates(obj, map) {

  const { objToCheck, arrX, arrY } = obj;
  const { arr: table, cell } = objToCheck;

  const getSolution = (func, cplx) => {

    // проверить на наличие null во входном массиве
    // если null найден, прервать выполнение
    if (!hasNoNull(cplx)) return null;

    const comb = func(cplx);

    if (comb != null) {

      const resultMap = excludeCandidates(cplx, comb, map);

      return resultMap;
    }

    return null;
  }

  const run = (f) => {

    return function (...args) {
      for (let arg of args) {
        // возвращает текущую числовую карту
        let currentMap = getSolution(f, arg);
      }
    }
  }
  
  const runWithHiddenSingle = run(getHiddenSingle);
  const runWithHiddenGroups = run(getHiddenGroups);
  const runWithNakedGroups = run(getNakedGroups);
  const runWithPointingGroups = run(getPointingGroups);

  runWithHiddenSingle(table, arrX, arrY);
  runWithHiddenGroups(table, arrX, arrY);
  runWithNakedGroups(table, arrX, arrY);
  runWithPointingGroups(table, arrX, arrY);

  return cell.value;
}