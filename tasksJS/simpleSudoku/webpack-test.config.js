// const webpack = require("webpack");
const path = require('path');

module.exports = {
  mode: 'development',
  devtool: 'inline-source-map',
  entry: {
    app: './tests/index.test.js'
  },
  output: {
    filename: '[name].[contenthash].test.js',
    path: path.resolve(__dirname, 'test-dist'),
    clean: true,
  },
  watch: true,
  watchOptions: {
    ignored: '**/node_modules',
  }
};