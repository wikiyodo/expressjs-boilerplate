var path = require('path');
var allPaths = require('./all-paths');

const pathResolver = (fileName, fileType) => {
    const root = path.dirname(require.main.filename);
    fileName = path.join(root, allPaths[fileType] || '', fileName);
    // middleware = path.relative(middleware, root);
    return fileName;
};



module.exports = pathResolver;
