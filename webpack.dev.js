const path = require('path');
const src = path.join(__dirname, 'src');
const merge = require('webpack-merge');
const webpack = require('webpack');
const common = require('./webpack.common.js');
const NodemonPlugin = require('nodemon-webpack-plugin');

const development = {
  clientConfig: {
    mode: 'development',
    entry: {
      client: [
        'react-hot-loader/patch',
        path.resolve(src, 'client.js'),
        'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000'
      ]
    },
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: '[name].[hash].js',
      publicPath: './',
      chunkFilename: '[name].[hash].js'
    },
    devtool: 'inline-source-map',
    plugins: [
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NoEmitOnErrorsPlugin(),
      new webpack.NamedModulesPlugin()
    ]
  },
  serverConfig: {
    mode: 'development',
    devtool: 'inline-source-map',
    plugins: [new NodemonPlugin()]
  }
};

module.exports = merge.multiple(common, development);
