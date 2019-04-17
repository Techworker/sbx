/* global __dirname, require, module*/

const webpackBaseConfig = require('./../../webpack.config');

const configLight = webpackBaseConfig(__dirname, '.light');

configLight.externals = {
  '@pascalcoin-sbx/common': '@pascalcoin-sbx/common'
};

const configFull = webpackBaseConfig(__dirname, '');

module.exports = [configLight, configFull];
