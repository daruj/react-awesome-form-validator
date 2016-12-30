const webpack               = require('webpack');
const WebpackNotifierPlugin = require('webpack-notifier');
const HtmlWebpackPlugin     = require('html-webpack-plugin');
//const ExtractTextPlugin     = require('extract-text-webpack-plugin');
const path                  = require('path');
const exampleFolder         = process.env.exampleFolder;

const webpackConfig = {
  entry: {
    app: [
      'babel-polyfill', // Set up an ES6-ish environment
      'webpack-dev-server/client?http://localhost:3000/', // WebpackDevServer host and port
      'webpack/hot/only-dev-server',
      `./example/${exampleFolder}/index.jsx`
    ],
    vendor: './src/vendors/index.js'
  },
  devServer: {
    contentBase: './build/dev_build'
  },
  output: {
    path: './build/dev_build',
    filename: 'app.bundle-[hash].js',
    publicPath: '/'
  },
  devtool: '#cheap-module-eval-source-map',
  module: {
    loaders: [

      // IMPORTANT: we don"t want to process EVERY single JS file with babel
      // loader. We only want to process the files inside our app structure
      // otherwise this could get very slow or even fail.
      { test: /\.jsx?$/, exclude: /node_modules/, loaders: ['babel-loader'] },
      { test: /\.json$/, loader: 'json-loader' },
      { test: /\.css$/,  loader: 'style-loader!css-loader?modules' },
      { test: /\.scss$/, loader: 'style-loader!css-loader?modules!sass-loader' },
      { test: /\.png/, loader: 'file-loader?mimetype=image/png' },
      { test: /\.jpg/, loader: 'file' },
      { test: /\.gif/, loader: 'file' },
      { test: /\.mp3/, loader: 'file' },
      { test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: 'url-loader?limit=10000&mimetype=application/font-woff' },
      { test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: 'file-loader' }
    ]
  },
  resolve: {

    // Needed so you can require("a") instead of require("a.jsx")
    extensions: ['', '.js', '.jsx', '.json', '.css', '.scss'],

    // Let us do things like require("app/reducers/application")
    root: __dirname,

    // Whenever someone does import "react", resolve the one in the node_modules
    // at the top level, just in case a dependency also has react in its node_modules,
    // we don't want to be running to versions of react!!!
    alias: {
      react: path.join(__dirname, 'node_modules/react')
    }
  },
  plugins: [
    new WebpackNotifierPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      filename: 'vendor.bundle-[hash].js',
      minChunks: Infinity
    }),
    new HtmlWebpackPlugin({
      template: `./example/${exampleFolder}/index.template.html`
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('development')
      }
    })
  ]
};


module.exports = webpackConfig;
