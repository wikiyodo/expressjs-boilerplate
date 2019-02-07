const resolver = require(process.env.resolver);
var mongoose = require(resolver.connection());
const BankSchema = require(resolver.dbSchema('bank'));

var Bank = mongoose.model('Bank', BankSchema);


module.exports = {
    Bank
};  