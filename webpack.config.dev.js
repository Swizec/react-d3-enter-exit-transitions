var path = require('path');
var webpack = require('webpack');

module.exports = {
  devtool: 'cheap-module-eval-source-map',
  entry: [
    'eventsource-polyfill', // necessary for hot reloading with IE
    'webpack-hot-middleware/client',
    './src/index'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/static/'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ],
  // require('./code') vs. require('./code.jsx');
  // import foo from './code';
  resolve: {
      extensions: ['', '.js', '.jsx']
  },
  module: {
    loaders: [{
      test: /\.js|\.jsx?/,
      loaders: ['babel'],
      include: path.join(__dirname, 'src')
    },
    {
        test: /\.less$/,
        loader: "style!css!less"
    }]
      // require('style.less')
      // --> <link ...
  }
};
