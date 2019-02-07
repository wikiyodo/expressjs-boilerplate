var crypto = require('crypto');
var config = require(process.env.ENV_G_PATH);
// Helpers for various tasks
var helpers = {};

helpers.hash = function (str) {
    if (typeof (str) == 'string' && str.length > 0) {
        var hash = crypto.createHmac('sha256', config.get('hashingSecret')).update(str).digest('hex');
        return hash;
    } else {
        return false;
    }
};

//parse a json object to an object in all cases, without throwing
helpers.parseJsonToObject = function (buffer) {
    try {
        var obj = JSON.parse(buffer);
        return obj;
    } catch (e) {
        return {};
    }
};

helpers.createRandomString = function (length) {
    length = typeof (length) == 'number' && length > 0 ? length : false;

    if (!length) return '';

    // define all possible characters
    var possibleCharacters = 'abcedfghijklmnopqrstuvwzyz0123456789'

    var str = '';
    for (i = 0; i < length; i++) {
        // get a random character from the possible string
        var randomCharacter = possibleCharacters.charAt(Math.random() * possibleCharacters.length)
        str += randomCharacter;
    }
    return str;
};

module.exports = helpers;