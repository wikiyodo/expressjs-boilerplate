var pathResolver = require('./index');
const constants = require('../../global/constants');

const controllerPath = (middleware) => {
    return pathResolver(middleware, constants.CONTROLLER);
};



module.exports = controllerPath;