var pathResolver = require('./index');
const constants = require('../../global/constants');


const rootPath = (file) => {
    return pathResolver(file);
};


module.exports = rootPath;