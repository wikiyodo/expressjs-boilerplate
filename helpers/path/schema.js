var pathResolver = require('./index');
const constants = require('../../global/constants');

const schemaPath = (middleware) => {
    return pathResolver(middleware, constants.SCHEMA);
};



module.exports = schemaPath;
