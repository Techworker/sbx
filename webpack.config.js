/* global __dirname, require, module*/

const path = require('path');
const env = require('yargs').argv.env;

module.exports = function (libraryRoot, outputSuffix, target) {
  const pkg = require(libraryRoot + '/package.json');

  let libraryName = pkg.name;

  let outputFile, mode;

  console.log(env);
  if (env === 'build') {
    mode = 'production';
    outputFile = libraryName + outputSuffix + '.min.js';
  } else {
    mode = 'development';
    outputFile = libraryName + outputSuffix + '.js';
  }

  return {
    target: target,
    mode: mode,
    entry: [libraryRoot + '/index.js'],
    devtool: 'source-map',
    output: {
      path: libraryRoot + '/lib',
      filename: outputFile,
      library: libraryName,
      libraryTarget: 'umd',
      umdNamedDefine: true,
      globalObject: "typeof self !== 'undefined' ? self : this"
    },
    module: {
      rules: [
        {
          test: /(\.js)$/,
          loader: 'babel-loader',
          exclude: /(node_modules|bower_components)/
        },
        {
          test: /(\.js)$/,
          loader: 'eslint-loader',
          exclude: /node_modules/
        }
      ]
    },
    optimization: {
      usedExports: true
    },
    resolve: {
      modules: [path.resolve(libraryRoot + '/node_modules'), path.resolve(__dirname + '/node_modules'), path.resolve(libraryRoot + '/src')],
      extensions: ['.mjs', '.json', '.js']
    }
  };
};
