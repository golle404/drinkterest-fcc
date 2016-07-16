var path = require('path');
var webpack = require('webpack');

var config = {
  entry: './app/index',
  output: {
    path: path.join(__dirname, 'public', 'js'),
    filename: 'bundle.js',
    publicPath: '/js'
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  module: {
    loaders: [
      {test: /(\.jsx|\.js)$/, loaders: ['babel'], exclude: /node_modules/}
    ]
  }
}

module.exports = config;
