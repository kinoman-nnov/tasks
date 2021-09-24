// готовые к употреблению фильтры
let arr = [1, 2, 3, 4, 5, 6, 7];

function inBetween(a, b) {   	
	return function (item) {
    if ((a <= item)&&(b >= item)) { 
      return item;
  	}
	}	
}

alert( arr.filter(inBetween(3, 6)) ); // 3,4,5,6

let newArr = [1, 2, 10, 7];

function inArray(array) {   	
	
  	return function (item) {
  	for (let i = 0; i < array.length; i++) {
      if (item === array[i]) { 
        return item;
      }
    }
	}	
}

alert( arr.filter(inArray(newArr)) ); // 1,2