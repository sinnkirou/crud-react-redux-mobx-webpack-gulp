const path = require('path');
var src = path.join(__dirname, 'src');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const clientConfig = {
  entry: {
    client: path.join(src, 'client.js'),
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: "[name].js"
  },
  target: "web",
  resolve: {
    extensions: [ '.js', '.jsx']
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
    new CleanWebpackPlugin(['dist'])
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

module.exports = [ serverConfig, clientConfig ];
