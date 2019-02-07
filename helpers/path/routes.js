var pathResolver = require('./index');
const constants = require('../../global/constants');

const routerPath = () => {
    return pathResolver('index',constants.ROUTER);
};



module.exports = routerPath;
