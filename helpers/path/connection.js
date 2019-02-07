var pathResolver = require('./index');
const constants = require('../../global/constants');

const connectionPath = () => {
    return pathResolver('/database/connection');
};



module.exports = connectionPath;
