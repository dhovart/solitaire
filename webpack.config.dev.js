const path = require('path');
const webpack = require('webpack');
var precss       = require('precss');
var autoprefixer = require('autoprefixer');

module.exports = {
  devtool: 'inline-source-map',
  entry: [
    'webpack-dev-server/client?http://0.0.0.0:8080',
    'webpack/hot/only-dev-server',
    './src/index'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/static/'
  },
  plugins: [
    new webpack.DefinePlugin({
      PRODUCTION: JSON.stringify(false)
    })

  ],
  module: {
    loaders: [
      {
        test: /\.js/,
        exclude: [/node_modules/, /styles/],
        loaders: ['react-hot', 'babel'],
        include: [
          path.join(__dirname, 'src'),
          path.join(__dirname, 'specs')
        ],
      },
      {
        test: /\.scss$/,
        loader: 'style!css!postcss!sass'
      },
      {
        test: /\.(eot|woff|woff2|ttf|svg|png|jpg)$/,
        loader: 'url-loader?limit=30000&name=[name]-[hash].[ext]'
      },
      {
        test: /\.json$/,
        loader: 'json'
      },
    ]
  },
  postcss: function () {
    return [precss, autoprefixer];
  },
};
