const resolver = require(process.env.resolver);
var mongoose = require(resolver.connection());
var lastUpdateDate = require('./plugins/last-update');
var Schema = mongoose.Schema;

// sample for a bank schema
var structure = {};
structure.name = String;
structure.code = String;

var bankSchema = new Schema(structure);

bankSchema.plugin(lastUpdateDate);

module.exports = bankSchema;