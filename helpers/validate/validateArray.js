

var result = (status, message, position) => {
    return {
        status,
        message,
        position
    };
};

var validateArray= (value, fieldName, customMessage) => {
    var valid = value instanceof Array;

    if (!valid && !customMessage) {
        customMessage = fieldName + " must be a list";
    }

    return result(valid, customMessage, 0);
};  


module.exports = validateArray;