/* global __dirname, require, module*/

const webpackBaseConfig = require('./../../webpack.config');

const configNode = webpackBaseConfig(__dirname, '.node', 'node');
const configWeb = webpackBaseConfig(__dirname, '', 'web');
const configWebKitchenSink = webpackBaseConfig(__dirname, '', 'web', '/kitchensink');

module.exports = [configNode, configWeb, configWebKitchenSink];
