const webpack               = require('webpack');
const WebpackNotifierPlugin = require('webpack-notifier');
const ExtractTextPlugin     = require('extract-text-webpack-plugin');
const path                  = require('path');

const webpackConfig = {
  entry: {
    app: './src/form/index.jsx'
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'index.js',
    publicPath: '/',
    library: 'Form',
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
  module: {
    loaders: [
      // IMPORTANT: we don"t want to process EVERY single JS file with babel
      // loader. We only want to process the files inside our app structure
      // otherwise this could get very slow or even fail.
      { test: /\.jsx?$/,
        exclude: /node_modules/,
        loaders: [
          'babel-loader'
        ]
      },
      { test: /\.json$/, loader: 'json-loader' },
      { test: /\.css$/,  loader: ExtractTextPlugin.extract('style-loader', 'css-loader?modules') },
      { test: /\.scss$/, loader: ExtractTextPlugin.extract('style-loader', 'css-loader?modules!sass-loader') },
      { test: /\.png/, loader: 'file-loader?mimetype=image/png' },
      { test: /\.jpg/, loader: 'file' },
      { test: /\.gif/, loader: 'file' },
      { test: /\.mp3/, loader: 'file' },
      { test: /\.woff2?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: 'file-loader?mimetype=application/font-woff' },
      { test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: 'file-loader' }
    ]
  },
  resolve: {
    // Needed so you can require("a") instead of require("a.jsx")
    extensions: ['', '.js', '.jsx', '.json', '.scss'],
    // Let us do things like require("app/reducers/application")
    root: __dirname,
    alias: {
      react: path.join(__dirname, 'node_modules/react')
    }
  },
  plugins: [
    new ExtractTextPlugin('styles.css', { allChunks: true }),
    new WebpackNotifierPlugin(),
    new webpack.NoErrorsPlugin()
  ]
};


module.exports = webpackConfig;
