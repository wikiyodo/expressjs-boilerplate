const resolver = require(process.env.resolver);
var mongoose = require(resolver.connection());
var lastUpdateDate = require('./plugins/last-update');
var createdDate = require('./plugins/created-at');
var Schema = mongoose.Schema;

// sample for a user schema
var structure = {};
structure.firstName = String;
structure.lastName = String;
structure.email = String;
structure.password = String;
structure.apiKey = String;

// structure.address = {
//     latitude: Number,
//     longitute: Number
// };

var userSchema = new Schema(structure);

userSchema.plugin(lastUpdateDate);
userSchema.plugin(createdDate);

module.exports = userSchema;