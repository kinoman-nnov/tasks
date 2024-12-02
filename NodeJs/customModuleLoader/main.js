const fs = require("fs");

let originalRequire = require;

let customRequire = (moduleName) => {
  const id = customRequire.resolve(moduleName);

  if (customRequire.cache[id]) {
    console.log('модуль загружен из кэша')
    return customRequire.cache[id].exports;
  }

  const module = {
    exports: {},
    id: id
  }

  customRequire.cache[id] = module;

  loadModule(id, module, customRequire);

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

customRequire.resolve = (moduleName) => {
  return originalRequire.resolve(moduleName);
}

const test = customRequire("./test");
const test2 = customRequire("./test");

test();