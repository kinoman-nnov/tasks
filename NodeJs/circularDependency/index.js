const a = require('./a');

// require будет загружаться из кэша,
// т. к. был загружен в a.js
const b = require('./b');

console.log(a);
console.log(b);