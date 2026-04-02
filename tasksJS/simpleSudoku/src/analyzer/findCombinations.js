import { sortByArrLength } from '../helpers.js';

export function findComb(cplx, compare, isSingle) {
  // пропустить пустые ячейки и числа
  const arrays = cplx.filter((item) => {
    if (!Array.isArray(item.value)) return;
    return item;
  });

  const sorted = sortByArrLength(arrays);

  // поиск групп кандидатов - пар/троек/четверок и т.д.
  let comb = null;

  // рассмотреть массивы длиной 2 < arr.length <= maxLength
  outer: for (let i = 1; i <= sorted.maxLength; i++) { // i - длина массивов

    if (!Array.isArray(sorted[i])) continue; // если такой длины массива не существует, пропустить

    const elemCache = new Set();

    for (let j = 0; j < sorted[i].length; j++) { // j - № массива

      const isRecurElem = sorted[i][j].value.every(num => elemCache.has(num)); // проверить на повтор входной элемент
      
      if (isRecurElem) continue; // если элемент с похожим набором чисел уже был, пропустить
      
      sorted[i][j].value.forEach(num => elemCache.add(num)); // добавить в кэш elem

      let compareObj;

      if (isSingle === true) compareObj = compare(cplx, sorted[i][j]);

      else compareObj = compare(arrays, sorted[i][j]);

      if (compareObj.group.length === 0) continue;
      // если группа найдена, прекратить поиск
      else {
        comb = compareObj;
        break outer;
      }
    }
  }

  return comb;
}