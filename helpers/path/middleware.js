var pathResolver = require('./index');
const constants = require('../../global/constants');

const middlewarePath = (middleware) => {
    return pathResolver(middleware, constants.MIDDLEWARE);
};



module.exports = middlewarePath;
