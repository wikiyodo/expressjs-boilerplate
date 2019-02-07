

var result = (status, message, position) => {
    return {
        status,
        message,
        position
    };
};

var validateEmail= (value, fieldName, customMessage) => {
    value = value || '';
    var valid = typeof value == 'string';

    if (valid) {
        var regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/;
        valid = value.match(regex) ? true : false;
    }

    if (!valid && !customMessage) {
        customMessage = fieldName + " must be a valid email";
    }

    return result(valid, customMessage, 0);
};  


module.exports = validateEmail;