const { merge } = require('webpack-merge');

// если функция webpack.common.js передается как функция,
// необходимо ее вызвать 
const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    static: './dist',
  },
});