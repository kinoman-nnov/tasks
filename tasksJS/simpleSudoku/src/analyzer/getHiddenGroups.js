import { inArray } from "../helpers.js";
import { notInArray } from "../helpers.js";
import { hasNoNull } from "../helpers.js";
import { findComb } from "./findCombinations.js";

// Условие "скрытой группы":
// пара -> 2 ячейки содержат 2 числа
// [a,b],[a,b]
// тройка -> 3 ячейки содержат 3 числа
// [a,b],[b,c],[a,c]; [a,b,c],[a,b,c],[a,b,c]; [a,b,c],[b,c],[a,c] и т.д. 
// четверка -> 4 ячейки содержат 4 числа
// [a,b],[b,c],[c,d],[a,d]; [a,b,c,d],[a,b,c,d],[a,b],[a,c]; и т.д.

// Ячейка в таблице может содержать кроме кандидатов сторонние числа,
// которые необходимо отфильтровать

export function getHiddenGroups(complex) {

  // проверить на наличие null в таблице
  // если null найден, исключить кандидатов не удастся, прервать выполнение
  if (!hasNoNull(complex)) return null;

  const compare = (arr, elem) => {

    const comb = { group: [], candidates: [], type: 'hidden' };
    const union = new Set();
    const singles = new Set();
    let match = [elem];
    const count = { // подсчет совпадений
      '1': 0,
      '2': 0,
      '3': 0,
      '4': 0,
      '5': 0,
      '6': 0,
      '7': 0,
      '8': 0,
      '9': 0
    };

    elem.value.forEach(num => count[num]++); // сразу добавить элемент

    for (let i = 0; i < arr.length; i++) {
      // пропустить сравнение элемента с самим собой
      if (arr[i] == elem) continue;

      const arrMatched = elem.value.filter(inArray(arr[i].value));

      arrMatched.forEach(num => count[num]++);

      switch (arrMatched.length) {
        case 0:
          continue;
        case 1:
          singles.add(...arrMatched);
          continue;
        default:
          match.push(arr[i]);
          arrMatched.forEach(num => union.add(num));
      }
    }

    // если число повторений кандидата больше длины массива, добавить его в исключения
    for (const [key, val] of Object.entries(count)) {
      if (val > elem.value.length) singles.add(+key);
    }

    // рекурсивно отфильтровать элементы с синглами
    const filteredMatches = (arr) => {

      let resultArr = [];
      let hasSingles = false;
      for (const el of arr) {
        const filteredArr = el.value.filter(notInArray([...singles]));

        switch (filteredArr.length) {
          case 0:
            continue;
          case 1:
            singles.add(...filteredArr);
            hasSingles = true;
            continue;
          default:
            const hasCommonItem = filteredArr.some(item => elem.value.includes(item));
            if (hasCommonItem) resultArr.push(el);
        }
      }
      if (hasSingles === true) resultArr = filteredMatches(resultArr);
      return resultArr;
    }

    match = filteredMatches(match); // исключить элементы с синглами

    const candidatesArr = [...union].filter(notInArray([...singles]));

    // если группа найдена, вернуть комбинацию
    if (match.length === candidatesArr.length) {
      comb.group = match;
      comb.candidates = candidatesArr;
    }

    return comb;
  }

  const hiddenGroup = findComb(complex, compare, false);

  return hiddenGroup;
}