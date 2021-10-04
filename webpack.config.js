const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require("copy-webpack-plugin");

const conf = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'main.js',
    clean: true,
    // publicPath: 'dist/' // добавить каталог внутри dist
  },
  devServer: {
    static: {
      directory: path.join(__dirname, 'dist'),
    },
    compress: true,
    port: 9000,
    devMiddleware: {
      index: true,
      mimeTypes: { 'text/html': ['phtml'] },
      publicPath: '/publicPathForDevServe',
      serverSideRender: true,
      writeToDisk: true,
    },
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: '/node_modules/'
      },
      // Правило для инлайнового добавления стилей
      // {
      //   test: /\.css$/,
      //   use: [
      //     'style-loader',
      //     'css-loader'
      //   ]
      // },
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: 'file-loader',
          },
        ],
      },
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "main.css"
    }),
    new HtmlWebpackPlugin({
      template: './src/index.html'
    }),
    new CopyPlugin({
      patterns: [
        { from: "src/data", to: "data" },
      ],
    }),
  ]
}

module.exports = conf;