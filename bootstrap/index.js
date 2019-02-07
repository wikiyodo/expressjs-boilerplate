/**
*   This initiates all bootables that are added to the system
*   Any bootable file to be added to this booter then but be an object, with a method init() which is
*   which serves as the singlet entry to the bootable file
*/

const BootEnvironment = require('./boot-environment');
const BootHelperPath = require('./boot-helper-path');


const bootables = [
    BootEnvironment,
    BootHelperPath,
];


const init = () => {
    bootables.map((e, i) => {
        e();
    });
};

module.exports = init;