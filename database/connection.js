var mongoose = require('mongoose');
var env = require(process.env.ENV_G_PATH).get("DATABASE");

var dbConnectionString = 'mongodb://';
dbConnectionString += env.USERNAME != '' ? env.USERNAME : '';
dbConnectionString += env.PASSWORD != '' ? ":" + env.PASSWORD : '';
dbConnectionString += (env.USERNAME != '' || env.USERNAME != '') ? '@' : '';
dbConnectionString += env.HOST;
dbConnectionString += env.PORT != '' ? ':'+env.PORT : '';
dbConnectionString += '/'+env.NAME;

mongoose.connect(dbConnectionString, { useNewUrlParser: true, ...env.OPTIONS });


module.exports = mongoose;