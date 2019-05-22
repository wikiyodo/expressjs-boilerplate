const middlewarePath = require('./path/middleware');
const defaultPath = require('./path/default');
const controllersPath = require('./path/controller');
const schemaPath = require('./path/schema');
const env = require('./environment/index');
const modelPath = require('./path/model');
const routerPath = require('./path/routes');
// const helpers = require('./aob');
const parser = require('./router/parser');
const connectionPath = require('./path/connection');

var exports = {};

exports.middleware = middlewarePath;
exports.controllers = controllersPath;
exports.defaultPath = defaultPath;
exports.dbSchema = schemaPath;
exports.model = modelPath;
exports.connection = connectionPath;
exports.router = routerPath;
exports.parser = parser;
// exports.helpers = helpers;
exports.validator = () => {
    return defaultPath('./helpers/validate/index');
};
exports.env = env;

module.exports = exports;