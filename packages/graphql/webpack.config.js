/* global __dirname, require, module*/

const webpackBaseConfig = require('./../../webpack.config');

const configLight = webpackBaseConfig(__dirname, '.light');

configLight.externals = {
    '@pascalcoin-sbx/json-rpc': '@pascalcoin-sbx/json-rpc'
};

const configFull = webpackBaseConfig(__dirname, '');

module.exports = [configLight, configFull];
