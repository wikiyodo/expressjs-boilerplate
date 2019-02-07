// This module to be loaded after the path module is loaded
const pathResolver = require(process.env.resolver);
const routes = require(pathResolver.router());

const init = (app) => {
    routes(app);
};

module.exports = init;