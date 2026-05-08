// const fromArray = require("from2-array"); // Модуль from2-array для создания потока на базе массива
// const through = require("through2"); // Модуль through2 для более удобной работы с потоками Transform

const fs = require("fs");
const path = require("path");
const createObjConfig = require('../../helpers/objConfig.js');
const through = require("../../helpers/through2Polyfill.js");
const fromArray = require("../../helpers/fromArrayPolyfill.js");

const _path = {
  src: "./src/js",
  dist: "./dist/js",
};

const files = ["first.js", "second.js", "third.js"].map((item) => {
  return path.join(_path.src, item);
});

function concatFiles(dest, files, callback) {

  const destStream = fs.createWriteStream(dest);

  fromArray.obj(files)
    .pipe(
      through.obj( // through.obj включает { objectMode: true, highWaterMark: 16 }
        (file, enc, done) => {
          const src = fs.createReadStream(file);
          src.pipe(destStream, { end: false }); // не обрывать поток после записи чанка, переходить к следующему
          src.on("error", (err) => {
            console.log(err.message);
            done();
          });
          src.on("end", done);
        }
      )
    )
    .on("finish", () => {
      destStream.end();
      callback();
    });
}

concatFiles(path.join(_path.dist, "main.js"), files, () => {
  console.log("Concat done!");
});