

var result = (status, message, position) => {
    return {
        status,
        message,
        position
    };
};

var validatRequired = (value, fieldName, customMessage) => {
    var valid = value !== '' && value !== undefined && value !== null;

    if (!valid && !customMessage) {
        customMessage = fieldName + " is required";
    }

    return result(valid, customMessage, 0);
};


module.exports = validatRequired;