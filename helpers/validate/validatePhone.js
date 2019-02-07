

var result = (status, message, position) => {
    return {
        status,
        message,
        position
    };
};

var validatePhone= (value, fieldName, customMessage) => {
    value = value || '';
    var valid = typeof value == "string" || typeof value == 'number';
    value += '';
    if (valid) {
        var regex = /^\d{10,11}$/;
        valid = value.match(regex) ? true : false;
    }

    if (!valid && !customMessage) {
        customMessage = fieldName + " must be a valid phone number";
    }

    return result(valid, customMessage, 0);
};  


module.exports = validatePhone;