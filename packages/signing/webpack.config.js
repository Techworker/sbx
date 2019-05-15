/* global __dirname, require, module*/

const webpackBaseConfig = require('./../../webpack.config');

const configNode = webpackBaseConfig(__dirname, '.node', 'node');
const configWeb = webpackBaseConfig(__dirname, '', 'web');

module.exports = [configNode, configWeb];
