

var result = (status, message, position) => {
    return {
        status,
        message,
        position
    };
};

var validateDecimal= (value, fieldName, customMessage, regex) => {
    var valid = typeof value == 'string' || typeof value == 'number';

    value += '';

    if (valid) {
        // now check to confirm that it is decimal
        valid = value.match(new RegExp(regex)) ? true : false;
    }

    if (!valid && !customMessage) {
        customMessage = fieldName + " did not follow the right format";
    }

    return result(valid, customMessage, 0);
};


module.exports = validateDecimal;