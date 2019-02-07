const path = require('path');

const getResolverPath = () => {
    var resolverPath = path.dirname(require.main.filename);
    resolverPath = path.join(resolverPath, 'helpers/index');

    return resolverPath;
};

const getAOBPath = () => {
    var resolverPath = path.dirname(require.main.filename);
    resolverPath = path.join(resolverPath, 'helpers/aob');

    return resolverPath;
};

const globalizeResolver = () => {
    process.env.resolver = getResolverPath();
};


const globalizeAOB= () => {
    process.env.aob = getAOBPath();
};

const init = () => {
    globalizeResolver();
    globalizeAOB();
};

module.exports = init;