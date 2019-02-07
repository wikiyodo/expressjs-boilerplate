const environment = require('../helpers/environment/index');

const init = () => {
    environment.loadEnv();
};

module.exports = init;