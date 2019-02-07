

var result = (status, message, position) => {
    return {
        status,
        message,
        position
    };
};

var validateDecimal= (value, fieldName, customMessage) => {
    var valid = typeof value == 'number' || typeof value == 'string';
    if (valid) {
        value += '';
        // now check to confirm that it is decimal
        valid = value.match(/^[-+]?([0-9]+)?\.[0-9]+$/) ? true : false;
    }

    if (!valid && !customMessage) {
        customMessage = fieldName + " must be a decimal number ";
    }

    return result(valid, customMessage, 0);
};


module.exports = validateDecimal;