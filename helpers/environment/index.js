var absolutePath = require('./../path/index');
var envPath = absolutePath('.env');
var fs = require('fs');
var path = require('path');

const loadEnvContent = (next) => {

    fs.readFile(envPath, 'utf-8', (err, data) => {
        if (err) {
            console.error(new Error("Unable to load environment file"), err);
            next({});
            return;
        }
        next(data);
    });
};

// parse the content of env from txt format to JSON
const parseEnvContent = (data) => {
    data = data || '';

    try {
        data = JSON.parse(data);
    } catch (errr) {
        // an empty object will be assigned to data to avoid uneccessary termination
        data = {};
    }

    return data;
};

// this will place the environment data into global variable to make it accessible to all scripts.
const putEnvContentInGlobal = (data) => {
    // var data = parseEnvContent(data);
    process.env.ENV_G_WIZ = data;
    process.env.ENV_G_PATH = path.join(__dirname, '/index.js');
};


const checkEnvContentInGlobal = () => {
    return process.env.ENV_G_WIZ || null;
};


// @Todo: This to be placed in the app boot
const loadEnv = () => {
    // check if the content exists

    if (checkEnvContentInGlobal() != null) return;

    // get the env content
    loadEnvContent(putEnvContentInGlobal);
};

const getConfig = (config) => {
    var allConfig = checkEnvContentInGlobal();

    if (allConfig == null)
        return '';

    allConfig = parseEnvContent(allConfig);
    if (!config) return allConfig;
    return allConfig[config];
};

module.exports = {
    loadEnv: loadEnv,
    get: getConfig
};