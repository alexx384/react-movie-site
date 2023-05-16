/* eslint-disable @typescript-eslint/no-var-requires */
const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const webpack = require('webpack');
const dotenv = require('dotenv');
const dotenvExpand = require('dotenv-expand');
const myEnv = dotenvExpand.expand({
  ignoreProcessEnv: true,
  parsed: { ...process.env, ...dotenv.config({ path: '.env.prod' }).parsed },
}).parsed;

const prodConfig = (env, argv) => {
  return {
    mode: 'production',
    devtool: 'source-map',
    plugins: [
      new webpack.DefinePlugin({
        'process.env': JSON.stringify(myEnv),
      }),
    ],
  };
};

module.exports = (env, argv) => merge(common(env, argv), prodConfig(env, argv));
