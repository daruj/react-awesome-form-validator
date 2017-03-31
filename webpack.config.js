const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const path = require('path');
const exampleFolder = process.env.exampleFolder;
//const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const DEVELOPMENT = process.env.NODE_ENV === 'development';
const PRODUCTION = process.env.NODE_ENV === 'production';

const plugins = [
  new webpack.NoEmitOnErrorsPlugin(),
  new webpack.optimize.CommonsChunkPlugin({
    name: 'vendor',
    // this assumes your vendor imports exist in the node_modules directory
    minChunks: (module) => module.context && module.context.indexOf('node_modules') !== -1
  }),
  new webpack.DefinePlugin({
    'process.env': {
      DEVELOPMENT: JSON.stringify(DEVELOPMENT),
      PRODUCTION: JSON.stringify(PRODUCTION)
    }
  }),
  new ExtractTextPlugin({
    filename: 'bundle-[hash].css',
    disable: false,
    allChunks: true
  }),
  new webpack.NamedModulesPlugin()
];

if (PRODUCTION) {
  plugins.push(new webpack.optimize.UglifyJsPlugin());
} else {
  plugins.push(
    new HtmlWebpackPlugin({
      template: `./example/${exampleFolder}/index.template.html`
    }),
    new webpack.HotModuleReplacementPlugin()
  );
}

const entry = PRODUCTION
  ? {
    main: './src/form/index.jsx'
  } :
{
  main: [
    'babel-polyfill', // Set up an ES6-ish environment
    'react-hot-loader/patch',
    'webpack-dev-server/client?http://localhost:3000/', // WebpackDevServer host and port
    `./example/${exampleFolder}/index.jsx`
  ]
};

const output = PRODUCTION
  ? {
    path: path.resolve(__dirname, './dist'),
    filename: 'bundle-[name].js',
    publicPath: '/'
  } : {
    path: path.resolve(__dirname, './build/dev_build'),
    filename: 'bundle-[name]-[hash].js',
    publicPath: '/'
  };

const webpackConfig = {
  entry,
  output,
  devtool: 'eval',
  devServer: {
    historyApiFallback: true,
    contentBase: './',
    hot: true
  },
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
  plugins
};


module.exports = webpackConfig;
