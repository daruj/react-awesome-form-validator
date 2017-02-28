import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import path from 'path';
const exampleFolder = process.env.exampleFolder;

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
  output: {
    path: path.resolve(__dirname, './build/dev_build'),
    filename: 'bundle-[name]-[hash].js',
    publicPath: '/'
  },
  devtool: '#cheap-module-eval-source-map',
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader'
        })
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader?modules', 'sass-loader']
        })
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx', '.css', '.scss'],

    modules: [
      'node_modules'
    ],

    // Whenever someone does import 'react', resolve the one in the node_modules
    // at the top level, just in case a dependency also has react in its node_modules,
    // we don't want to be running to versions of react!!!
    alias: {
      react: path.join(__dirname, 'node_modules/react')
    }
  },
  plugins: [
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      filename: 'bundle-[name]-[hash].js',
      minChunks: Infinity
    }),
    new HtmlWebpackPlugin({
      template: `./example/${exampleFolder}/index.template.html`
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('development')
      }
    }),
    new ExtractTextPlugin({
      filename: 'bundle-[hash].css',
      disable: false,
      allChunks: true
    })
  ]
};


module.exports = webpackConfig;
