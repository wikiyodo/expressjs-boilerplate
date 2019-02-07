/**
 * This is responsible for validating all inputs
 */
var async = require("async");
var validateMin = require('./validateMin');     // tested
var validateAlpha= require('./validateAlpha');  // tested
var validateAlphaNum = require('./validateAlphaNum');   // tested
var validateArray = require('./validateArray');     // tested
var validateDecimal = require('./validateDecimal'); // tested
var validateEmail = require('./validateEmail'); // tested
var validateFile = require('./validateFile');   // not finished
var validateMax = require('./validateMax');     // tested
var validateNumber = require('./validateNumber'); // tested
var validatePhone = require('./validatePhone'); // tested
var validateRegex = require('./validateRegex'); // tested 
var validateRequired = require('./validateRequired'); // tested

var validateObject = (instruction) => {
    // instruction is expected to be an object
    var {fieldName, fieldValue, validation, errorMessage, options} = instruction;

    var validationProccessed = validation.split('|');

    var results = validationProccessed.map((rule, i) => {
        // now process the rule
        var processedRule = rule.split(':');
        var validateType = processedRule[0];
        var validateLength = processedRule.slice(1).join(':');
        validateType = validateType.split('-').map((e, i) => {
            if (typeof e != 'string') return '';
            return e.charAt(0).toUpperCase() + e.slice(1);
        });
        
        validateType = validateType.join('');
        validateType = "validate" + validateType + "(fieldValue, fieldName, errorMessage, validateLength, options)";
        return eval(validateType);
    });

    // process the result object returned from the validator
    var returnableResult = {};
    returnableResult.messages = [];
    returnableResult.name = fieldName;

    var passed = true;

    results.forEach((result, i) => {
        if (!result.status) {
            passed = false
            returnableResult.messages.push(result.message);
        }
    });
    returnableResult.status = passed;
    
    return returnableResult;
};

var validationResult = (callback, results) => {
    var formatedResult = {};
    formatedResult.failed_ = false;
    formatedResult.results = {};

    results.forEach((result, index) => {
        if (!result.status)
            formatedResult.failed_ = true;

        formatedResult.results[result.name] = {
            status: result.status,
            messages: result.messages
        };
    });

    formatedResult.failed = () => {
        return formatedResult.failed_;
    };

    formatedResult.getErrors = (fieldName) => {
        return formatedResult.results[fieldName].messages;
    };

    formatedResult.firstError = (fieldName) => {
        var errors = formatedResult.results[fieldName];
        if (!errors || !errors.messages || !(errors instanceof Array)) return '';
         
        return errors.messages[0] || '';
    };

    callback(formatedResult);
};

var validator = (instructions, callback) => {
    var checked = 0;
    if (instructions instanceof Array) {
        var checkable = instructions.length;
        var results = [];
        async.forEachOf(instructions, (instruction, key, result) => {
            results.push(validateObject(instruction));
            ++checked;
            if (checked == checkable) {
                // proceed to the result
                validationResult(callback, results);
            }
        });
    } else {
        validationResult(callback, validateObject(instructions));
    }
};

module.exports = validator