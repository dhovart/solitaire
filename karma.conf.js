var webpack = require('karma-webpack');
var webpackConfig = require('./webpack.config.dev');

module.exports = function (config) {
  config.set({
    browsers: ['Chrome'],
    singleRun: true,
    frameworks: ['mocha', 'chai'],
    files: [
      { pattern: 'specs/**/*_spec.js', watched: false },
    ],
    plugins: [
      webpack,
      'karma-chrome-launcher',
      'karma-mocha',
      'karma-chai',
    ],
    preprocessors: {
      'specs/**/*_spec.js': ['webpack'],
      'specs/helpers/*.js': ['webpack'],
    },
    webpack: webpackConfig,
    webpackMiddleware: { stats: 'none' },
  });
};
