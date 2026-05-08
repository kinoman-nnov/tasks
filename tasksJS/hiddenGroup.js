function inArray(array) {
  return function (x) {
    return array.includes(x);
  }
}
function notInArray(array) {
  return function (x) {
    return !array.includes(x);
  }
}

// входной массив
const hiddenPair = [1, [2, 4, 5, 6], [3, 5, 7], "2", [6, 9], null, [2, 3, 4, 6, 7], 8, [5, 9], null, , [3, 5, 7, 9], [3, 7, 9]];
const hiddenThree = [[4, 7, 8, 9], [4, 8, 9], [4, 7], [2, 4, 5, 6, 7, 8], [4, 7, 8], 1, [2, 4, 6, 9], 3, [2, 4, 5, 7, 8, 9]];
const hiddenThree2 = [[2, 5], [4, 5, 7, 8], [2, 4, 7, 8, 9], [1, 5], 6, [2, 4, 8, 9], [1, 2], 3, [1, 2, 9]];
const hiddenFour = [[1, 8], [1, 8, 6], 3, 9, [1, 2, 5, 6, 7], [2, 5, 6, 7], 4, [1, 2, 5, 6, 8], [1, 2, 5, 6]];
const hiddenFour2 = [[1, 3, 4, 6, 7, 8, 9], [3, 7, 8], [3, 4, 6, 7, 8, 9], [2, 3, 7, 8], [2, 3, 5, 7, 8], [2, 3, 5, 7, 8], [1, 3, 4, 7, 8, 9], [3, 5, 7, 8], [3, 4, 5, 7, 8, 9]];

// пропустить пустые ячейки и числа
const inputArr = hiddenFour2.filter((item) => {
  if (!Array.isArray(item)) return;
  return item;
});

// получить массив соответствий
const getDuplicatesMap = (array) => {
  // коллекция повторяющихся элементов
  const repeated = new Set();

  const duplicatesMap = [];
  for (let i = 0; i < array.length; i++) {

    // текущий элемент
    // исключить из текущего массива уже найденные дубликаты 
    let item = array[i].filter(notInArray(Array.from(repeated)));

    if (item.length == 0) continue;

    // исключить повторные сравнения элементов
    const chunk = array.slice(i + 1);

    if (chunk.length == 0) continue;

    const objMatch = {};
    let arrDuplicates = [];
    const cache = new Set();
    let count = {
      '1': 0,
      '2': 0,
      '3': 0,
      '4': 0,
      '5': 0,
      '6': 0,
      '7': 0,
      '8': 0,
      '9': 0
    }

    for (const arr of chunk) {

      // сравнить поэлементно массивы между собой, вернуть массивы дубликатов
      const duplicates = item.filter(inArray(arr));

      if (duplicates.length == 0) continue;

      // добавить синглы в cache и перейти к следующей итерации
      if (duplicates.length == 1) {
        cache.add(...duplicates);
        continue;
      }

      // добавить дубликаты в коллекцию повторов
      // добавить дубликаты в count
      duplicates.forEach((value) => {
        repeated.add(value);
        count[value]++;
      });

      // добавить дубликаты в массив совпадений
      arrDuplicates.push(duplicates);
    }

    if (arrDuplicates.length == 0) continue;

    // исключить синглы из arrDuplicates и item
    if (cache.size != 0) {
      const duplicatesSlice = [];
      for (const arr of arrDuplicates) {
        const slice = arr.filter(elem => !cache.has(elem));
        duplicatesSlice.push(slice);
      }
      // заменить arrDuplicates и item массивами без синглов
      arrDuplicates = duplicatesSlice;
      item = item.filter(elem => !cache.has(elem));
    }

    // частный случай, когда кандидат повторяется во всех 9ти ячейках
    if (arrDuplicates.length == 8) { // count == 8 + 1 arrMatch
      // найти повторы
      const array = [];
      for (const elem of Object.entries(count)) {
        if (elem[1] == 8) array.push(+elem[0]);
      }
      // удалить повторы
      const duplicatesCut = [];
      for (const arr of arrDuplicates) {
        const slice = arr.filter(notInArray(array));
        if (slice.length != 0) duplicatesCut.push(slice);
      }
      // заменить arrDuplicates и item
      arrDuplicates = duplicatesCut;
      item = item.filter(notInArray(array));
    }

    objMatch.currentArr = array[i];
    objMatch.arrMatch = item;
    objMatch.candidates = arrDuplicates;

    // добавить в массив соответствий
    duplicatesMap.push(objMatch);
  }

  return duplicatesMap;
}

const complexArr = getDuplicatesMap(inputArr);
console.log(complexArr);

const analyzeResults = (complex) => {
  outer: for (const item of complex) {
    const duplicatesArr = [item.arrMatch, ...item.candidates];

    // пропустить массивы длиной больше четверки
    if (duplicatesArr.length > 4) continue;

    const cache = new Set();

    for (let i = 0; i < duplicatesArr.length; i++) {
      if (duplicatesArr[i].length < 2) continue outer;

      duplicatesArr[i].forEach((value) => {
        cache.add(value);
      });
    }

    // условие, что массив является парой/тройкой/четверкой
    if (duplicatesArr.length != cache.size) continue outer;

    switch (cache.size) {
      case 2:
        console.log('hiddenPair', duplicatesArr);
        continue;
      case 3:
        console.log('hiddenThree', duplicatesArr);
        continue;
      case 4:
        console.log('hiddenFour', duplicatesArr);
        continue;
      default:
        console.log("Нет таких значений");
    }
  }
}
analyzeResults(complexArr);