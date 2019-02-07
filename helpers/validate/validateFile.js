

var result = (status, message, position) => {
    return {
        status,
        message,
        position
    };
};

var validateFile = (value, fieldName, customMessage, options) => {
    var valid = value instanceof File;

    if (!valid && !customMessage) {
        customMessage = fieldName + " must be a file";
    }

    return result(valid, customMessage, 0);
};


module.exports = validateFile;