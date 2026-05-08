// общий конфиг для objectMode-потоков 
module.exports = function createObjConfig(options = {}) {
  return {
    ...options,
    objectMode: true,
    highWaterMark:
      options && options.highWaterMark != null
        ? options.highWaterMark
        : 16
  }
}