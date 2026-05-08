const stream = require("stream");
// const Chance = require("chance");
 
// const chance = new Chance();

const FakeString = require("../../helpers/chancePolyfill.js");

const chance = new FakeString();
 
class RandomStream extends stream.Readable {
  constructor(options) {
    super(options);
  }
  _read(size) {
    const chunk = chance.string();
    this.push(chunk, "utf8");
    if (chance.bool({ likelihood: 5 })) {
      this.push(null);
    }
  }
}
 
const rs = new RandomStream();

// Чтобы начать чтение нужно подписаться на события.
rs.on("readable", () => {
  let chunk;
  while ((chunk = rs.read()) !== null) {
    console.log(`Block read: size(${chunk.length}) - ${chunk.toString()}`);
  }
});