const path = require('path');
var src = path.join(__dirname, 'src');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const clientConfig = {
  mode: "development",
  entry: {
    client: ['react-hot-loader/patch', path.join(src, 'client.js'), 'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000']
  },
  output: {
    path: __dirname,
    filename: '[name].js',
    publicPath: '/',
  },
  target: "web",
  resolve: {
    extensions: ['.js', '.jsx']
  },
  module: {
    rules: [
      {
        test: /\.js|jsx$/,
        exclude: /node_modules/,
        loader: "babel-loader"
      },
      {
        test: /\.sass$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  ]
};

var nodeExternals = require('webpack-node-externals');

const serverConfig = {
  target: "node",
  node: {
    __dirname: true
  },
  plugins: [
    new CleanWebpackPlugin(['dist'])
  ],
  externals: [nodeExternals()]
};

module.exports = [clientConfig];
