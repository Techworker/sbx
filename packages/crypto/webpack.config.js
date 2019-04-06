/* global __dirname, require, module*/

const webpackBaseConfig = require('./../../webpack.config');

const configLight = webpackBaseConfig(__dirname, '.light');

configLight.externals = {
    '@sbx/common': '@sbx/common'
};

const configFull = webpackBaseConfig(__dirname, '');

module.exports = [configLight, configFull];
