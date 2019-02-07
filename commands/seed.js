var resolver = require(process.env.resolver);
var seeder = require(resolver.defaultPath('helpers/seeder/index'));

var exports = {};

exports.runSeed = (args) => {
    seeder();
};

module.exports = exports;