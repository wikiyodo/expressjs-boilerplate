

var result = (status, message, position) => {
    return {
        status,
        message,
        position
    };
};

var validateAlphaNum = (value, fieldName, customMessage, length, options) => {
    options = options || {};
    value = typeof value == "string" ? value : false;
    var valid;

    if (value !== false) {

        regexText = "[A-Za-z0-9]*";
        var alphaRegex;
        if (options.startWithNumber)
            regexText = "[0-9]" + regexText;
        if (options.endWithNumber)
            regexText += "[0-9]";
        if (options.startWithCapital)
            regexText = "[A-Z]" + regexText;
        if (options.endWithCapital)
            regexText += "[A-Z]";
        if (options.startWithLowerCase)
            regexText = "[a-z]" + regexText;
        if (options.endWithLowerCase)
            regexText += "[a-z]";

        alphaRegex = new RegExp("^" + regexText + "$");
        valid = value.match(alphaRegex) ? true : false;
    } else {
        valid = false;
    }

    if (!valid && !customMessage) {
        customMessage = fieldName + " must contain alphnumerical values only";
    }

    return result(valid, customMessage, 0);
};


module.exports = validateAlphaNum;