const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const path = require('path');

module.exports = {
  entry: {
    app: './src/index.js',
  },
  output: {
    filename: '[name].[contenthash].js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        include: path.resolve(__dirname, 'src'),
        use: [
          MiniCssExtractPlugin.loader, // вместо "style-loader"
          "css-loader"
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'src', 'index.html')
    }),
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css'
    })
  ],
  // optimization: {
  //   moduleIds: 'deterministic',
  //   runtimeChunk: 'single',
  //  splitChunks: {
  //    cacheGroups: {
  //      vendor: {
  //        test: /[\\/]node_modules[\\/]/,
  //        name: 'vendors',
  //        chunks: 'all',
  //      },
  //    },
  //  },
  // }
}