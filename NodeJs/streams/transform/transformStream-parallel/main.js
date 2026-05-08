const fs = require("fs");

// const split = require("split");
// const request = require("request");
// const thP = require("through2-parallel");

const request = require('../../helpers/requestPolyfill.js');
const thP = require("../../helpers/through2Polyfill.js");
const split = require("../../helpers/split.js");

const urlFile = process.argv[2] || "urlList.txt";

fs.createReadStream(urlFile)
  .pipe(split())
  .pipe(
    thP.obj(
      { concurrency: 6, }, // параллельность (количество запросов)
      function (url, enc, done) {
        if (!url) return done();
        request(url, (err, response, body) => {

          this.push(`${url}  -  ${JSON.parse(body).commit.message} \n`);
          done();
        });
      }
    )
  )
  .pipe(fs.createWriteStream("result.txt"))
  .on("finish", () => {
    console.log("Done!");
  });