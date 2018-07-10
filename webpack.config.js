const path = require('path');

var src = path.join(__dirname, 'src');
const CleanWebpackPlugin = require('clean-webpack-plugin')

module.exports = {
  entry: {
    client: path.join(src, 'views/client.js'),
    server: path.join(src, 'views/server.js')
  },
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: "[name].js"
  },
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
    new CleanWebpackPlugin(['build'])
  ],
}
