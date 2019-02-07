

var result = (status, message, position) => {
    return {
        status,
        message,
        position
    };
};

var validateString= (value, fieldName, customMessage) => {
    var valid = typeof value == 'string';

    if (!valid && !customMessage) {
        customMessage = fieldName + " must be a string";
    }

    return result(valid, customMessage, 0);
};


module.exports = validateString;