const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const webpack = require('webpack');
const dotenv = require('dotenv');
const dotenvExpand = require('dotenv-expand');
const myEnv = dotenvExpand.expand({
  ignoreProcessEnv: true,
  parsed: { ...process.env, ...dotenv.config({ path: '.env.dev' }).parsed },
}).parsed;

const devConfig = (env, argv) => {
  return {
    mode: 'development',
    devtool: 'inline-source-map',
    plugins: [
      new webpack.DefinePlugin({
        'process.env': JSON.stringify(myEnv),
      }),
      new ReactRefreshWebpackPlugin({
        overlay: false,
      }),
    ],
    devServer: {
      static: './dist',
      hot: true,
      compress: true,
      historyApiFallback: true,
      port: process.env['PORT'] || 3000,
      open: process.env['BROWSER'] !== 'none' ? true : false,
    },
  };
};

module.exports = (env, argv) => merge(common(env, argv), devConfig(env, argv));
