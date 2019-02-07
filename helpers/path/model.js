var pathResolver = require('./index');
const constants = require('../../global/constants');

const modelPath = (middleware) => {
    return pathResolver(middleware, constants.MODEL);
};



module.exports = modelPath;
