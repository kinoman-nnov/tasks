const { merge } = require('webpack-merge');

// если функция webpack.common.js передается как функция,
// необходимо ее вызвать 
const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'production',
  devtool: 'source-map',
});