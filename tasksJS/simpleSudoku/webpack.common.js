const HtmlWebpackPlugin = require("html-webpack-plugin");

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
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'public', 'index.html')
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