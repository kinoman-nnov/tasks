// задачи
// готовые к употреблению фильтры
// let arr = [1, 2, 3, 4, 5, 6, 7];

// function inBetween(a, b) {
//   return function (item) {
//     if ((a <= item) && (b >= item)) {
//       return item;
//     }
//   }
// }

// console.log(arr.filter(inBetween(3, 6))); // 3,4,5,6

// let newArr = [1, 2, 10, 7];

// function inArray(array) {
//   return function (item) {
//     for (let i = 0; i < array.length; i++) {
//       if (item === array[i]) {
//         return item;
//       }
//     }
//   }
// }
// // function inArray(array) {
// //   return function(x) {
// //     return array.includes(x);
// //   };
// // }

// console.log(arr.filter(inArray(newArr))); // 1,2,7


let list = {
  value: 1,
  next: {
    value: 2,
    next: {
      value: 3,
      next: {
        value: 4,
        next: null
      }
    }
  }
};

function printListReverse(list) {

  let temp = list;
  let arr = [];

  while(temp) {
    arr.push(temp.value)
    temp = temp.next;
  }
  
  for(let i = arr.length - 1; i >= 0; i--) {
    console.log(arr[i])
  }
}

// printListReverse(list);

function printListReverseRecursive(list) {
  
  if (list.next) printListReverseRecursive(list.next);
  console.log(list.value);
}

printListReverseRecursive(list);