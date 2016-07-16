var path = require('path');
var webpack = require('webpack');

var config = {
  debug: true,
  devtool: 'cheap-module-eval-source-map',
  noInfo: false,
  entry: [
    'webpack-hot-middleware/client?reload=true',
    './app/index'
  ],
  output: {
    path: path.join(__dirname, 'public', 'js'),
    filename: 'bundle.js',
    publicPath: '/js'
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  plugins:[
    new webpack.HotModuleReplacementPlugin()
  ],
  module: {
    loaders: [
      {test: /(\.jsx|\.js)$/, loaders: ['babel'], exclude: /node_modules/},
      {test: /\.ico$/, loader: 'file-loader?name=[name].[ext]'},
      {test: /(\.css|\.scss)$/, loaders: ['style', 'css?sourceMap', 'sass?sourceMap']}
    ]
  }
}

module.exports = config;
