const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const AssetsPlugin = require('assets-webpack-plugin');

module.exports = {
  entry: ['babel-polyfill', './src/client/index.js'],
  output: {
    path: path.resolve(__dirname, 'build/client'),
    filename: "bundle.[hash].js",
    libraryTarget: 'umd'
  },

  // exclude empty dependencies, require for Joi
  node: {
    net: 'empty',
    tls: 'empty',
    dns: 'empty'
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': '"production"',
    }),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false,
        drop_console: true,
        unsafe: true,
        pure_getters: true,
        dead_code: true,
        unsafe_comps: true,
        screw_ie8: true,
      }
    }),
    new webpack.optimize.DedupePlugin(),
    new webpack.PrefetchPlugin('react-dom/server.js'),
    new ExtractTextPlugin('main.css'),
    new AssetsPlugin({
      filename: 'assets.json',
      path: path.resolve(__dirname, 'build/client'),
    }),
  ],

  resolve: {
    modulesDirectories: ['node_modules'],
    extensions: ['', '.json', '.jsx', '.js'],
  },

  resolveLoader: {
    modulesDirectories: ['node_modules'],
    moduleTemplates: ['*-loader', '*'],
    extensions: ['', '.js'],
  },

  module: {
    loaders: [
      {
        include: /\.json$/,
        loader: 'json-loader',
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('style', 'css'),
        include: [
          path.resolve(__dirname, 'src/client'),
          path.resolve(__dirname, 'node_modules/react-spinkit/css')
        ]
      },
      {
        test: /\.less$/, loader: 'style!css!less',
      },
      {
        test: /\.(png|jpg|ico|svg)$/, loader: 'url-loader?limit=8192',
      },
      {
        test: /.jsx?$/,
        loader: 'babel-loader',
        include: [
          path.join(__dirname, 'src'),
        ],
        // exclude: /node_modules/,
        query: {
          compact: false,
          cacheDirectory: true,
          plugins: ['transform-decorators-legacy'],
          presets: ['es2015', 'react', 'stage-0'],
        }
      }
    ]
  }
};
