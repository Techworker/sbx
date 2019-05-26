const path = require('path');
const prePublish = require('../../../prepublish');

prePublish('test', path.join(__dirname, '../'));
