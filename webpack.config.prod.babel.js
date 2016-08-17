import webpack from 'webpack';
import path from 'path';
import precss from 'precss';
import autoprefixer from 'autoprefixer';
import ExtractTextPlugin from 'extract-text-webpack-plugin';

const GLOBALS = {
  'process.env': {
    'NODE_ENV': JSON.stringify('production')
  }
};

const sassLoaders = [
  'css-loader',
  'postcss-loader',
  'sass-loader?includePaths[]=' + path.resolve(__dirname, './public/css')
];

export default {
  debug: true,
  devtool: 'source-map',
  noInfo: false,
  entry: [
    'whatwg-fetch',
    './app/index'
  ],
  target: 'web',
  output: {
    path: __dirname + '/public',
    publicPath: '/',
    filename: './js/bundle.js'
  },
  resolve: {
    extensions: ['', '.js', '.jsx', '.scss']
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.DefinePlugin(GLOBALS),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin(),
    new ExtractTextPlugin("css/style.css")
  ],
  postcss: [
    autoprefixer({
      browsers: ['last 2 versions']
    })
  ],
  module: {
    loaders: [
      {test: /(\.jsx|\.js)$/, loader: 'babel', exclude: /node_modules/},
      {test: /\.(eot|ttf|woff|woff2)$/, loader: 'file-loader?name=font/[name].[ext]'},
      {test: /\.(jpe?g|gif)$/i, loader: 'file-loader?name=images/[name].[ext]'},
      {test: /\.svg$/, loader: "url-loader?mimetype=image/svg+xml&limit=10000&name=svg/[name].[ext]"},
      {test: /\.ico$/, loader: 'file-loader?name=[name].[ext]'},
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract('style-loader', sassLoaders.join('!'))
      }
    ]
  }
};
