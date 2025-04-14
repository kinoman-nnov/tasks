// готовые к употреблению фильтры

let arr = [1, 2, 3, 4, 5, 6, 7];

function inBetween(a, b) {
  return function (item) {
    if ((a <= item) && (b >= item)) {
      return item;
    }
  }
}

// console.log(arr.filter(inBetween(3, 6))); // 3,4,5,6

let anotherArr = [1, 2, 10, 7];

// function inArray(array) {
//   return function (item) {
//     for (let i = 0; i < array.length; i++) {
//       if (item === array[i]) {
//         return item;
//       }
//     }
//   }
// }

function inArray(array) {
  return function (x) {
    return array.includes(x);
  };
}

function notInArray(array) {
  return function (x) {
    return !array.includes(x);
  };
}

// console.log(arr.filter(inArray(anotherArr))); // 1,2,7

const complexArray = [1, [9, 0, 8], 2, null, 3, 3, [8, 9], [9, 8], [9, 0, 8], false, [9, 0, 8], [9, 8, 0], [1, 2, 3, 4, 5], undefined, true, [1]];

// вспомогательная функция, возвращает массив с повторяющимися подмассивами
function getDuplicateArrays(array) {
  return array.filter((item) => {
    if (!Array.isArray(item)) return;

    // сравнить массивы между собой
    for (const subArr of array) {
      if (!Array.isArray(subArr)) continue;

      // исключить сравнение текущего массива с самим собой
      if (item == subArr) continue;

      if (item.length != subArr.length) continue;

      // сравнить не строго (порядок элементов в массиве не учитывается)
      const isDuplicate = item.every((element) => subArr.includes(element));

      // сравнить строго (порядок элементов в массиве учитывается)
      // const isDuplicate = item.every((value, index) => value === subArr[index]);

      if (isDuplicate) return item;
    }
    return;
  });
}

console.log(getDuplicateArrays(complexArray)); // [ [ 9, 0, 8 ], [ 8, 9 ], [ 9, 8 ], [ 9, 0, 8 ], [ 9, 0, 8 ], [ 9, 8, 0 ] ]