'use strict';

const path = require('path');
const webpack = require('webpack');
const { VueLoaderPlugin } = require('vue-loader');
const NODE_ENV = process.env.NODE_ENV || 'development';

let plugins = [
  new webpack.HotModuleReplacementPlugin(),
  new VueLoaderPlugin(),
  // new webpack.optimize.OccurenceOrderPlugin(),
  // new webpack.NoErrorsPlugin(),
];

module.exports = {
  mode: 'development',
  entry: './src/client/index.js',
  output: {
    path: path.resolve(__dirname, 'build/client'),
    filename: 'bundle.js',
    libraryTarget: 'umd',
    // hot: true,
  },

  devtool: NODE_ENV == 'development' ? 'cheap-inline-module-source-map' : null,

  plugins: plugins,

  resolve: {
    modules: ['node_modules'],
    extensions: ['.json', '.vue', '.js'],
  },

  resolveLoader: {
    modules: ['node_modules'],
    mainFields: [ 'loader', 'main'],
    // moduleTemplates: ['*-loader', '*'],
    extensions: ['.js', '.vue'],
  },

  module: {
    rules: [
      {
        test: /\.json$/,
        use: 'json-loader',
      },
      {
        test: /\.css$/, use: "style-loader",
      },
      {
        test: /\.css$/, use: "css-loader",
      },
      {
        test: /\.less$/, use: 'style!css!less',
      },
      {
        test: /\.(png|jpg|ico|svg)$/, use: 'url-loader?limit=8192',
      },
      {
        test: /\.vue$/,
        use: 'vue-loader',
      },
      // {
      //   test: /\.vue$/,
      //   use: {
      //     loader: 'vue-loader',
      //     query: {
      //       name: '[name].[ext]',
      //       compact: false,
      //       cacheDirectory: true,
      //       plugins: ['transform-decorators-legacy'],
      //       presets: ['es2015', 'stage-3', 'env'],
      //     }
      //   },
      // },
    ],
  },
};
