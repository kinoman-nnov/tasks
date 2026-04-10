import { hasNoNull } from '../helpers.js';
import { findComb } from './findCombinations.js';

// Условие "голой группы":
// пара -> 2 ячейки содержат 2 числа
// [a,b],[a,b]
// тройка -> 3 ячейки содержат 3 числа
// [a,b],[b,c],[a,c]; [a,b,c],[a,b,c],[a,b,c]; [a,b,c],[b,c],[a,c] и т.д. 
// четверка -> 4 ячейки содержат 4 числа
// [a,b],[b,c],[c,d],[a,d]; [a,b,c,d],[a,b,c,d],[a,b],[a,c]; и т.д.

// Ячейка в таблице не является частью пары/тройки/четверки, если содержит 
// кроме кандидатов сторонние числа

export function getNakedGroups(complex) {

  // проверить на наличие null в таблице
  // если null найден, исключить кандидатов не удастся, прервать выполнение
  if (!hasNoNull(complex)) return null;

  const compare = (arr, elem) => {

    const comb = { group: [], candidates: [], type: 'naked' };
    const union = new Set();

    elem.value.forEach(num => union.add(num));

    const combArr = [elem];

    for (let i = 0; i < arr.length; i++) {
      // пропустить сравнение элемента с самим собой
      if (arr[i] == elem) continue;

      const hasNums = arr[i].value.every(num => union.has(num));

      if (hasNums === true) combArr.push(arr[i]);
    }

    // найденная комбинация
    if (combArr.length === elem.value.length) {
      comb.group = combArr;
      comb.candidates = [...union];
    }

    return comb;
  }

  const nakedGroup = findComb(complex, compare, false);

  return nakedGroup;
}