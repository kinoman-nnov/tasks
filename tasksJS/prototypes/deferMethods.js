// Добавьте всем функциям в прототип метод defer(ms), который вызывает функции через ms миллисекунд.

function f() {
  console.log("Hello!");
}

Function.prototype.defer = function (ms) {

  setTimeout(this, ms);

}

f.defer(1000); // выведет "Hello!" через 1 секунду



// Добавьте всем функциям в прототип метод defer(ms), который возвращает обёртку, откладывающую вызов функции на ms миллисекунд.

// function f(a, b) {
//   alert(a + b);
// }

// Function.prototype.defer = function (ms) {
//   const currentThis = this;

//   return function () {
//     setTimeout(() => currentThis.apply(this, arguments), 1000)
//   }
// }

// f.defer(1000)(1, 2); // выведет 3 через 1 секунду.