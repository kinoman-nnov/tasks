const fs = require("fs");

let originalRequire = require;

let customRequire = (moduleName) => {

  // путь до загружаемого файла
  const pathId = customRequire.resolve(moduleName);

  if (customRequire.cache[pathId]) {
    console.log('модуль загружен из кэша')
    return customRequire.cache[pathId].exports;
  }

  // создать объект модуль, присвоить pathId как путь до файла
  const module = { exports: {}, pathId }

  customRequire.cache[pathId] = module;

  loadModule(pathId, module, customRequire);

  return module.exports;
}

function loadModule(filename, objModule, funcRequire) {
  // filename ==> абсолютный путь до файла ./test.js
  // objModule ==> module = { exports: {}, id: id }
  // requireFunc ==> функция customRequire

  // добавляем шаблонную строку в module.exports с содержимым загружаемого файла 
  // module.exports = () => { console.log("Test module"); }
  const wrapSrc = `
    (function(module, exports, requireFunction){
      console.log('модуль загружен');
      ${fs.readFileSync(filename, "utf8")}
      
    })(objModule, objModule.exports, funcRequire);
  `;

  // выполнить строку 
  eval(wrapSrc);
}

customRequire.cache = {};

// использовать для custom resolve оригинальный метод resolve()
customRequire.resolve = (moduleName) => {
  return originalRequire.resolve(moduleName);
}

const test = customRequire("./test");
const test2 = customRequire("./test");

test();