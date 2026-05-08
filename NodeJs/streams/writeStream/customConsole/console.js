const fs = require("fs");
const { Console } = require("console");

let output = fs.createWriteStream("./stdout.log");
let outerror = fs.createWriteStream("./stderr.log");

// переопределить методы console.log() и console.error()
// вместо вывода сообщений в консоль,
// создает файлы stdout.log и stderr.log и записывает сообщения в них
let customConsole = new Console(output, outerror);

customConsole.log("test message");
customConsole.error("Error send");