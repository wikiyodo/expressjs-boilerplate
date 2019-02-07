/**
* This libraryis for storing and editing readFileSync
*/


//import dependencies
var fs = require('fs');
var path = require('path');
var helpers = require('../aob');
var resolver = require(process.env.resolver);

//library container
var lib = {};

//base directory o fthe data folder
lib.baseDir = resolver.defaultPath('./.data');

//write data to readFileSync
lib.write = function (dir, file, data, callback) {
    // open the file for writing
    fs.open(lib.baseDir + '/' + dir + '/' + file + '.json', 'wx', function (err, fileDescriptor) {
        if (err) {
            console.log(err);
            callback(err);
            return;
        }

        //convert data into string
        var stringData = JSON.stringify(data);
        fs.writeFile(fileDescriptor, stringData, function (err) {
            if (err) {
                callback(err);
                return;
            }
            callback(false);
        });
    });

};

lib.read = function (dir, file, callback) {
    fs.readFile(lib.baseDir + '/' + dir + '/' + file + '.json', "utf8", function (err, fileContent) {
        callback(err, helpers.parseJsonToObject(fileContent), file);
    });
};

lib.update = function (dir, file, data, callback) {
    fs.open(lib.baseDir + '/' + dir + '/' + file + '.json', 'r+', function (err, fileDescriptor) {
        if (err) {
            callback(err);
            return;
        }

        //convert data into string
        var stringData = JSON.stringify(data);
        fs.truncate(fileDescriptor, function (err) {
            if (err) {
                callback(err);
                return;
            }

            fs.writeFile(fileDescriptor, stringData, function (err) {
                if (err) {
                    callback(err);
                    return;
                }
                callback(false);
            });
        });
    });
};

lib.delete = function (dir, file, callback) {
    fs.unlink(lib.baseDir + '/' + dir + '/' + file + '.json', function (err) {
        callback(err || false);
    });
};

module.exports = lib;
