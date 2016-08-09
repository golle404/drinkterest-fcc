import path from'path';
import webpack from'webpack';
import precss from 'precss';
import autoprefixer from 'autoprefixer';

const config = {
  debug: true,
  devtool: 'cheap-module-eval-source-map',
  noInfo: false,
  entry: [
    'webpack-hot-middleware/client?reload=true',
    'whatwg-fetch',
    './app/index'
  ],
  output: {
    path: path.join(__dirname, 'public'),
    filename: 'bundle.js',
    publicPath: '/js/'
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
      {test: /\.eot(\?v=\d+.\d+.\d+)?$/, loader: 'file'},
      {test: /\.(woff|woff2)$/, loader: 'file-loader?prefix=font/&limit=5000'},
      {test: /\.ttf(\?v=\d+.\d+.\d+)?$/, loader: 'file-loader?limit=10000&mimetype=application/octet-stream'},
      {test: /\.(jpe?g|gif)$/i, loaders: ['file']},
      {test: /\.svg$/, loader: "url-loader?mimetype=image/svg+xml"},
      {test: /\.ico$/, loader: 'file-loader?name=[name].[ext]'},
      {
        test: /(\.css|\.scss)$/,
        loaders: ['style', 'css?sourceMap', 'sass?sourceMap'],
        postcss: function () {
          return [precss, autoprefixer];
        }
      }
    ]
  }
};

export default config;
