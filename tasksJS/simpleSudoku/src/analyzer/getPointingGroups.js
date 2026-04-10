import { inArray } from "../helpers.js";
import { hasNoNull } from "../helpers.js";
import { findComb } from "./findCombinations.js";

// Условие "указывающей группы":
// пара -> 2 ячейки содержат 1 число в строке/столбце
// [a,b],[a,c]

// тройка -> 3 ячейки содержат 1 число в строке/столбце
// [a,b,c],[a,d,e],[a,f,g]

// Ячейка в таблице может содержать кроме указывающей пары сторонние числа,
// которые необходимо отфильтровать

export function getPointingGroups(complex) {

  // проверить на наличие null в таблице
  // если null найден, исключить кандидатов не удастся, прервать выполнение
  if (!hasNoNull(complex)) return null;

  const compare = (arr, elem) => {

    const comb = { group: [], candidates: {}, type: 'pointing' };
    const unionX = new Set();
    const unionY = new Set();
    const eceptionsX = new Set();
    const eceptionsY = new Set();
    const matchX = [elem];
    const matchY = [elem];
    const elemTableId = elem.address.innerTableId;
    const elemAddressX = elem.address.axisX;
    const elemAddressY = elem.address.axisY;

    for (let i = 0; i < arr.length; i++) {
      // пропустить сравнение элемента с самим собой
      if (arr[i] == elem) continue;

      const arrMatched = elem.value.filter(inArray(arr[i].value));

      if (arrMatched.length === 0) continue;

      const isEqualTableId = arr[i].address.innerTableId === elemTableId;
      const isEqualAddressX = arr[i].address.axisX === elemAddressX;
      const isEqualAddressY = arr[i].address.axisY === elemAddressY;

      // если элемент находится в другой таблице,
      // добавить кандидаты в исключения по X и Y
      if (!isEqualTableId) {
        arrMatched.forEach(num => {
          eceptionsX.add(num);
          eceptionsY.add(num);
        });
        continue;
      }

      // если arr[i] находится в одной строке с elem, добавить в unionX
      if (isEqualAddressX) {
        matchX.push(arr[i]);
        arrMatched.forEach(num => unionX.add(num));
        continue;
      }

      // если arr[i] находится в одном столбце с elem, добавить в unionY
      if (isEqualAddressY) {
        matchY.push(arr[i]);
        arrMatched.forEach(num => unionY.add(num));
        continue;
      }

      // остальных кандидатов добавить в исключения по X и Y
      arrMatched.forEach(num => {
        eceptionsX.add(num);
        eceptionsY.add(num);
      });
    }

    // отфильтровать исключения по X
    unionX.forEach(num => eceptionsX.has(num) ? unionX.delete(num) : num);

    // отфильтровать исключения по Y
    unionY.forEach(num => eceptionsY.has(num) ? unionY.delete(num) : num);

    // если группа найдена по Х, добавить комбинацию
    if (matchX.length > 1 && unionX.size === 1) {
      comb.group.push({ [elemAddressX]: matchX });
      comb.candidates[elemAddressX] = [...unionX];
    }

    // если группа найдена по Y, добавить комбинацию
    if (matchY.length > 1 && unionY.size === 1) {
      comb.group.push({ [elemAddressY]: matchY });
      comb.candidates[elemAddressY] = [...unionY];
    }

    return comb;
  }

  const pointingGroup = findComb(complex, compare, false);

  return pointingGroup;
}