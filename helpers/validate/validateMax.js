var validateMaxString = (length, value, fieldName, customMessage) => {
    var valid = false;
    if(value === undefined){
        valid = false;
    }else{
        length = parseFloat(length);

        valid = value.length <= length;
    }
    if (!customMessage)
        customMessage = fieldName + ' should contain more than ' + length + ' chatacters';

    return result(valid, valid ? '' : customMessage);
};

var validateMaxNumber = (length, value, fieldName, customMessage) => {
    length = parseFloat(length);

    var valid = value <= length;
    if (!customMessage)
        customMessage = fieldName + ' cannot be less than ' + length;

    return result(valid, valid ? '' : customMessage);
};

var validateMaxArray = (length, value, fieldName, customMessage) => {
    length = parseFloat(length);

    var valid = value.length <= length;
    if (!customMessage)
        customMessage = fieldName + ' should contain more than ' + length + ' items';

    return result(valid, valid ? '' : customMessage);

};

var validateMaxFile = (length, value, fieldName, customMessage) => {
    length = parseFloat(length);

    var valid = (value.length / 1000) <= length;

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

var validateMax = (value, fieldName, customMessage, length) => {
    var validation;
    if (value instanceof Array)
        validation = validateMaxArray(length, value, fieldName, customMessage);
    else if (typeof value == 'string')
        validation = validateMaxString(length, value, fieldName, customMessage);
    else if (typeof value == 'number')
        validation = validateMaxNumber(length, value, fieldName, customMessage);
    // else if (value instanceof File)
    //    validation = validateMaxFile(length, value, customMessage);
    else 
        validation = validateMaxString(length, value, fieldName, customMessage);

    return validation;
};


module.exports = validateMax;