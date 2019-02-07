const defaultPath = require('../path/default');
const UrlObject = require(defaultPath('routes/routes-string'));
const path = require('path');
const url = require('url');


const generateUrlString = (urlSelector, urlObject, trailing) => {
    var parsedSelector = (typeof urlSelector == 'object') ? urlSelector : (urlSelector || '').split('.');
    urlObject = urlObject || UrlObject;
    trailing = trailing || '';
    var trailingParsed = trailing.split('.');
    var currentSelector = parsedSelector[0];


    if (trailingParsed.length > 0 && parsedSelector.length > 0 && trailingParsed[0].toLowerCase() == parsedSelector[0].toLowerCase()) {

        delete parsedSelector[0];
        delete trailingParsed[0];

        parsedSelector.shift();
        trailingParsed.shift();
        
        return (generateUrlString(parsedSelector, urlObject[currentSelector], trailingParsed.join('.'))).replace('//', '/');
    } else if (parsedSelector.length == 1) {
        return urlObject[parsedSelector[0]];
    }
    else if (parsedSelector.length == 0) {
        return '';
    }
    delete parsedSelector[0];
    parsedSelector.shift();

    try {
        return (currentSelector + '/' + generateUrlString(parsedSelector, urlObject[currentSelector], trailing)).replace('//', '/');
    } catch (err) {
        console.error(err);
    }
};

const parseUrlAgainstParameters = (url, parameters) => {
    for (var key in parameters) {
        url = url.replace(':' + key, parameters[key]);
    }

    return url;
};

const removeTrailingUrl = (url, trailing) => {
    var trailRegex = new RegExp("^" + trailing+"(.)?");
    url = url.replace(trailRegex, '');
    if (url == '') return '/';
    return url;
};

const parser = (urlSelector, parameters, skipBackSlash) => {
    // the url selector is expected to be a string
    // the parameters are meant to be presented with object datatype
    // if (typeof parameters == "string" && parameters != '')
    //     urlSelector = removeTrailingUrl(urlSelector, parameters);

    // get the generated url 
    var url = generateUrlString(urlSelector, undefined, parameters);
    url = url == '' ? '/' : url;
    if (!skipBackSlash) {
        url = '/'+url
    }
    if (parameters == undefined || typeof parameters == 'string')
        return url;
    
    return parseUrlAgainstParameters(url, parameters);
};

module.exports = parser;