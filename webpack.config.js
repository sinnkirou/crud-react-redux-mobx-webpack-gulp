const path = require('path');

module.exports = {
  entry: {
    client: './src/views/client.js',
    server: './src/views/server.js',
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
      { test: /\.js|jsx$/, exclude: /node_modules/, loader: "babel-loader" }
    ]
 }

}
