const a = require('./a');

const b = require('./b');

console.log('Для модуля A:', a);
console.log('Для модуля B:', b);

// 1. Запуск, a.js загружается
// aModule = {
//   exports: {}, // пустой объект по умолчанию
//   id: './a',
//   filename: '.../a.js',
//   loaded: false // модуль ещё не загружен
// }

// 2. Выполнение a.js
// aModule.exports = { loaded: false }

// 3. a.js загружает внутри себя b.js

// 4. Создаётся объект модуля b
// bModule = {
//   exports: {},
//   loaded: false
// }

// 5. Выполнение b.js
// bModule.exports = { loaded: false }

// 6. b.js загружает внутри себя a.js
// Node видит, что a.js уже находится в процессе загрузки
// (есть в кэше, но aModule.loaded === false)
// Вместо повторного запуска a.js, возвращается текущее состояние 
// aModule.exports = { loaded: false }
// a.js ещё не завершил выполнение, поэтому
// module.exports = { ... } в конце a.js ещё не выполнен
// Теперь в b.js: const a = require('./a'); // → { loaded: false }

// 7. exports.loaded → bModule.exports.loaded → false
// a.loaded → false (из aModule.exports, который ещё не обновлён)
// Вывод в консоль: log after require A from b.js false false

// 8. b.js завершает выполнение
// module.exports = {
//   aWasLoaded: a.loaded, // a.loaded = false
//   loaded: true
// }
// Теперь bModule.exports = {
//   aWasLoaded: false,
//   loaded: true
// }
// bModule.loaded = true

// 9. Возврат в a.js require('./b') в a.js завершается,
// и b получает значение финального экспорта из b.js:
// const b = {
//   aWasLoaded: false,
//   loaded: true
// }

// 10. Продолжение a.js: exports.loaded → aModule.exports.loaded → false (ещё не перезаписан)
// b.loaded → true
// Вывод в консоль: log after require B from a.js false true

// 11. a.js завершает выполнение
// module.exports = {
//   bWasLoaded: b.loaded, // b.loaded = true
//   loaded: true
// }
// Теперь aModule.exports = {
//   bWasLoaded: true,
//   loaded: true
// }
// aModule.loaded = true