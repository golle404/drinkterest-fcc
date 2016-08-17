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
      {test: /(\.jsx|\.js)$/, loader: 'babel', exclude: /node_modules/},
      {test: /\.(eot|ttf|woff|woff2)$/, loader: 'file-loader?name=font/[name].[ext]'},
      {test: /\.(jpe?g|gif)$/i, loader: 'file-loader?name=images/[name].[ext]'},
      {test: /\.svg$/, loader: "url-loader?mimetype=image/svg+xml&limit=10000&name=svg/[name].[ext]"},
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
