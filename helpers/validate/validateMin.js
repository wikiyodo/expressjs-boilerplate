var validateMinString = (length, value, fieldName, customMessage) => {
    length = parseFloat(length);

    var valid = value.length >= length;
    if (!customMessage)
        customMessage = fieldName + ' should contain less than ' + length + ' chatacters';

    return result(valid, valid ? '' : customMessage);
};

var validateMinNumber = (length, value, fieldName, customMessage) => {
    length = parseFloat(length);

    var valid = value >= length;
    if (!customMessage)
        customMessage = fieldName + ' cannot be less than ' + length;

    return result(valid, valid ? '' : customMessage);
};

var validateMinArray = (length, value, fieldName, customMessage) => {
    length = parseFloat(length);

    var valid = value.length >= length;
    if (!customMessage)
        customMessage = fieldName + ' should contain more than ' + length + ' items';

    return result(valid, valid ? '' : customMessage);

};

var validateMinFile = (length, value, fieldName, customMessage) => {
    length = parseFloat(length);

    var valid = (value.length / 1000) >= length;

    if (!customMessage)
        customMessage = fieldName + ' should contain more than ' + length + ' kb';

    return result(valid, valid ? '' : customMessage);
};

var result = (status, message, position) => {
    return {
        status,
        message,
        position
    };
};

var validateMin = (value, fieldName, customMessage, length) => {
    var validation;

    if (value instanceof Array)
        validation = validateMinArray(length, value, fieldName, customMessage);
    else if (typeof value == 'string')
        validation = validateMinString(length, value, fieldName, customMessage);
    else if (typeof value == 'number')
        validation = validateMinNumber(length, value, fieldName, customMessage);
    // else if (value instanceof File)
    //    validation = validateMinFile(length, value, customMessage);
    else return;

    return validation;
};


module.exports = validateMin;