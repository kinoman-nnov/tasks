import { hasNoNull } from "../helpers.js";
import { findComb } from "./findCombinations.js";

// Условие для "скрытого сингла":
// массив содержит одиночное число в ряду/столбце/таблице

export function getHiddenSingle(complex) {

  // проверить на наличие null в таблице
  // если null найден, исключить кандидатов не удастся, прервать выполнение
  if (!hasNoNull(complex)) return null;
  
  const compare = (arr, elem) => {
    
    const comb = { group: [], candidates: {}, type: 'hiddenSingle' };

    const union = new Set();
    elem.value.forEach(num => union.add(num));

    for (const item of arr) {

      if (item == elem) continue;

      if (!Array.isArray(item.value)) union.has(item.value) ? union.delete(item.value) : item;

      else item.value.forEach(num => union.has(num) ? union.delete(num) : num);
    }

    if (union.size === 1) {
    
      comb.group = elem;
      comb.candidates = [...union];
    }

    return comb;
  }

  const hiddenSingleArr = findComb(complex, compare, true);

  return hiddenSingleArr;
}