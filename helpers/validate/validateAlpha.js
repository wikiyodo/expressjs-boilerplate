

var result = (status, message, position) => {
    return {
        status,
        message,
        position
    };
};

var validateAlpha = (value, fieldName, customMessage, length, options) => {
    options = options || {};
    value = typeof value == "string" ? value : false;
    var valid;

    if (value !== false) {

        regexText = "[A-Za-z]*";
        var alphaRegex;
        if (options.startWithCapital)
            regexText = "[A-Z]" + regexText;
        if (options.endWithCapital)
            regexText += "[A-Z]";
        if (options.startWithLowerCase)
            regexText = "[a-z]" + regexText;
        if (options.endWithLowerCase)
            regexText += "[a-z]";
        console.log(regexText);
        alphaRegex = new RegExp("^" + regexText + "$");
        valid = typeof value == 'string' ? (value.match(alphaRegex) ? true : false) : false;
    } else {
        valid = false;
    }

    if (!valid && !customMessage) {
        customMessage = fieldName + " must contain alphabetical values only";
    }

    return result(valid, customMessage, 0);
};


module.exports = validateAlpha;