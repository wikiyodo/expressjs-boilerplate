

var result = (status, message, position) => {
    return {
        status,
        message,
        position
    };
};

var validateNumber= (value, fieldName, customMessage) => {
    value += '';

    var valid = value.match(/^([0-9]?)+$/) ? true : false;

    if (!valid && !customMessage) {
        customMessage = fieldName + " must contain numbers only";
    }

    return result(valid, customMessage, 0);
};


module.exports = validateNumber;