// global.Promise = require('bluebird');
// const config = require("./src/config");
const webpack = require('webpack');
const path = require('path');
// const { spawn } = require('child_process');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const WebpackIsomorphicToolsPlugin = require('webpack-isomorphic-tools/plugin');
const ESLintWebpackPlugin = require('eslint-webpack-plugin');

// const port = (parseInt(process.env.BASEPORT, 10) + 50);
const port = 19050;
const publicPath = process.env.NODE_ENV === 'production' ? '/public/assets/'
  : '/public/assets/';
//  : `${process.env.PUBLIC_ADDR}:${port}/public/assets/`;

const cssName = process.env.NODE_ENV === 'production' ? 'styles-[hash].css' : 'styles.css';
const jsName = process.env.NODE_ENV === 'production' ? 'bundle-[hash].js' : '[name].js';
const webpackIsomorphicToolsPlugin = new WebpackIsomorphicToolsPlugin(require('./webpack-isomorphic-tools-configuration'))
  .development();

const plugins = [
  new webpack.DefinePlugin({
    'process.env': {
      BROWSER: JSON.stringify(true),
      NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'development'),
    },
  }),
  // new MiniCssExtractPlugin({ filename: "[name].css", chunkFilename: "[id].css" }),
  new MiniCssExtractPlugin({
    filename: cssName,
    chunkFilename: cssName,
  }),
  new ESLintWebpackPlugin({ extensions: ['js', 'jsx']}),
  new webpack.HotModuleReplacementPlugin(),
  webpackIsomorphicToolsPlugin,
];

if (process.env.NODE_ENV === 'production') {
  plugins.push(new CleanWebpackPlugin(['/public/assets/'], {
    root: __dirname,
    verbose: true,
    dry: false,
  }));
  plugins.push(new webpack.optimize.DedupePlugin());
  plugins.push(new webpack.optimize.OccurenceOrderPlugin());
}

module.exports = {
  context: path.resolve(__dirname),
  entry: { app: [ 'react-hot-loader/patch', './src/client.jsx' ] },
  // entry: path.resolve(__dirname, './src/client.jsx'),
  // entry: { app: ['./src/client.jsx'] },
  // entry: { app: [path.resolve(__dirname, './src/client.jsx')] },
  output: {
    path: `${__dirname}/public/assets/`,
    filename: jsName,
    publicPath,
  },
  resolve: {
    extensions: [
      '.js',
      '.jsx',
    ],
    alias: {
//      'react-dom': '@hot-loader/react-dom',
      'assert': 'assert',
      'buffer': 'buffer',
      'crypto': 'crypto-browserify',
      'fs': 'fs',
      'path': 'path-browserify',
      'process': 'process/browser',
      'stream': 'stream-browserify',
      'node-uuid': 'uuid',
      'util': 'util',
    },
//    modules: [
//      'node_modules',
//      'src',
//    ],
//    fallback: { path: require.resolve('') },
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/u,
          name: 'vendor',
          chunks: 'all',
        },
        styles: {
          name: 'styles',
          test: /\.css$/u,
          chunks: 'all',
          enforce: true,
        },
      },
    },
  },
  plugins,
  module: {
    rules: [
      {
        test: /\.(?<ext>js|jsx)$/u,
        exclude: [/node_modules/u],
        use: [
          { loader: 'babel-loader' },
          //          {
          //            'loader': 'eslint-loader',
          //            'options': { 'configFile': '.eslintrc.js' }
          //          }
        ],
        resolve: {
          fullySpecified: false
        }
      },
      {
        test: /\.(?<ext>png|woff|woff2|eot|ttf|svg)$/u,
        use: [
          {
            loader: 'url-loader',
            options: { limit: '100000' },
          },
        ],
      },
      // { test: /\.json$/u, loader: 'json-loader' },
      {
        test: /\.(?<ext>css|sass|scss)$/u,
        use: [
          'css-hot-loader',
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          'sass-loader',
        ],
      },
      {
        test: webpackIsomorphicToolsPlugin.regularExpression('images'),
        // test: /\.(jpe?g|png|gif|svg)$/i,
        use: [
          {
            loader: 'url-loader',
            options: { hash: 'sha512', digest: 'hex', name: 'images/[name].[ext]' },
          },
        ],
      },
    ],
  },
  devtool: process.env.NODE_ENV !== 'production' ? 'source-map' : null,
  devServer: {
    host: '0.0.0.0',
    historyApiFallback: true,
    disableHostCheck: true,
    port,
    // watchContentBase: true,
    hot: true,
    open: true,
    // contentBase: path.join(__dirname, 'public'),
    publicPath,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
    },
  },
};
